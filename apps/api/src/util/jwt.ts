// utils/jwt.ts
import jwt from 'jsonwebtoken';
import { Response } from 'express';

// TODO: Set up env
export const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET ?? 'youraccesstokensecret';
export const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET ?? 'yourrefreshtokensecret';

export const generateAccessToken = (user: any): string => {
  // TODO: create correct type, and return correct type and payload
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      maxSessionEndingTime: user.maxSessionEndingTime,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: '15m', // TODO: Move to env_config (or ENV variables)
    }
  );
};

export const generateRefreshToken = (userId: string, email: string): string => {
  return jwt.sign({ sub: userId, email }, REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  });
};

export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie('refreshToken', token, {
    path: '/',
    domain: '.localhost',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure flag in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
};
