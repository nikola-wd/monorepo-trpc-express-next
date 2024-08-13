// services/auth.service.ts
import { Response } from 'express';
import { TRPCError } from '@trpc/server';
import { prisma } from '../db';
import jwt from 'jsonwebtoken';
import { TVS_signup_schema } from '@repo/validation-schemas';
import { hashPassword, verifyPassword } from '../util/auth';
import {
  REFRESH_TOKEN_SECRET,
  generateAccessToken,
  generateRefreshToken,
  setRefreshTokenCookie,
} from '../util/jwt';
import { env_config } from '../env_config';

export const authService = {
  /****************************************************************
   * MARK: Sign up a user *****************************************
   ****************************************************************/
  registerUser: async (input: TVS_signup_schema) => {
    const { email, password, registerAs } = input;

    // TODO :Wrap in a transaction
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Email is already in use.',
        });
      }

      const hashedPassword = await hashPassword(password);

      // TODO: Create a transaction and maybe move to authDbRepository
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          roles: {
            set: [registerAs],
          },
        },
      });
      // TODO: This should be a transaction along with create user
      if (registerAs === 'owner') {
        await prisma.businessGroup.create({
          data: {
            name: `${email}'s Business Group`,
            owner: {
              connect: {
                id: user.id,
              },
            },
          },
        });
      }

      return {
        id: user.id,
        email: user.email,
      };
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: "Couldn't sign up. Please try again.",
      });
    }
  },

  /****************************************************************
   * MARK: Sign in a user *****************************************
   ****************************************************************/
  signIn: async (email: string, password: string, res: Response) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user?.password) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid email or password.',
      });
    }

    if (!(await verifyPassword(password, user.password))) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid email or password.',
      });
    }

    const sessionDuration = env_config.SESSION_MAX_DURATION;
    const maxSessionEndingTime = new Date(Date.now() + sessionDuration);

    // Generate tokens
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      maxSessionEndingTime: maxSessionEndingTime.getTime(),
    });
    const refreshToken = generateRefreshToken(user.id, user.email);

    // Store the session
    try {
      await prisma.userSession.create({
        data: {
          userId: user.id,
          hashedRefreshToken: refreshToken,
          maxSessionEndingTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Example: 30 days
        },
      });

      // Set refresh token as HttpOnly cookie
      setRefreshTokenCookie(res, refreshToken);

      return {
        accessToken,
      };
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Error creating user session.',
      });
    }
  },

  /****************************************************************
   * MARK: Sign out a user ****************************************
   ****************************************************************/
  signOut: async (userId: string, res: Response) => {
    try {
      await prisma.$transaction(async (prisma) => {
        const activeSession = await prisma.userSession.findFirst({
          where: {
            userId,
            sessionDeletedAt: null,
          },
          orderBy: {
            sessionCreatedAt: 'desc',
          },
          select: {
            id: true,
          },
        });

        if (activeSession) {
          await prisma.userSession.update({
            where: { id: activeSession.id },
            data: { sessionDeletedAt: new Date() },
          });
        }
      });

      res.clearCookie('refreshToken', { path: '/', domain: 'localhost' });
      res.clearCookie('sessionUser', { path: '/', domain: 'localhost' });

      return { ok: 'User successfully logged out' };
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to logout.',
      });
    }
  },

  /****************************************************************
   * MARK: Refresh tokens *****************************************
   ****************************************************************/
  refreshTokens: async (refreshToken: string, res: Response) => {
    try {
      const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as {
        sub: string;
      };

      const userSession = await prisma.userSession.findFirst({
        where: {
          userId: decoded.sub,
          sessionDeletedAt: null,
        },
        select: {
          id: true, // Include the session ID for update
          hashedRefreshToken: true,
          maxSessionEndingTime: true,
        },
      });

      if (!userSession) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid refresh token.',
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.sub },
        select: {
          email: true,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not found.',
        });
      }

      // Validate if the session is expired
      if (new Date(userSession.maxSessionEndingTime).getTime() < Date.now()) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Session expired.',
        });
      }

      const sessionDuration = env_config.SESSION_MAX_DURATION;
      const maxSessionEndingTime = new Date(Date.now() + sessionDuration);

      const newAccessToken = generateAccessToken({
        id: decoded.sub,
        email: user.email,
        maxSessionEndingTime: maxSessionEndingTime.getTime(),
      });
      const newRefreshToken = generateRefreshToken(decoded.sub, user.email);

      await prisma.userSession.update({
        where: { id: userSession.id }, // Use the session ID for the update
        data: { hashedRefreshToken: newRefreshToken },
      });

      setRefreshTokenCookie(res, newRefreshToken);

      return {
        accessToken: newAccessToken,
      };
    } catch (error) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid refresh token.',
      });
    }
  },
};
