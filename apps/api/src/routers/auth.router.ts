import { createTRPCRouter, publicProcedure } from '../trpc';
import {
  TauthSignInSchema,
  authSignInSchema,
  authSignUpSchema,
} from '@repo/validation-schemas';
import { authService } from '../services/auth.service';
import { TRPCError } from '@trpc/server';
import { Context } from '../Context';
import { authGuardProcedure } from '../guards/authGuardProcedure';

export const authRouter = createTRPCRouter({
  /****************************************************************
   * MARK: Sign up a user *****************************************
   ****************************************************************/
  signUp: publicProcedure
    .input(authSignUpSchema)
    .mutation(async ({ input }) => {
      return authService.registerUser(input);
    }),

  /****************************************************************
   * MARK: Sign in a user *****************************************
   ****************************************************************/
  signIn: publicProcedure
    .input(authSignInSchema)
    .mutation(
      async ({ input, ctx }: { input: TauthSignInSchema; ctx: Context }) => {
        const { email, password } = input;
        const { res } = ctx;
        return authService.signIn(email, password, res);
      }
    ),

  /****************************************************************
   * MARK: Sign out a user ****************************************
   ****************************************************************/
  signOut: authGuardProcedure.mutation(async ({ ctx }) => {
    const { user, res } = ctx;
    return authService.signOut(user.id, res);
  }),
  // signOut: publicProcedure.use(authGuardProcedure).mutation(async ({ ctx }) => {
  //   const { user, res } = ctx;
  //   return authService.signOut(user.id, res);
  // }),

  /****************************************************************
   * MARK: Refresh tokens *****************************************
   ****************************************************************/
  refreshTokens: publicProcedure.mutation(async ({ ctx }: { ctx: Context }) => {
    console.log('_______________CALLING REFRESH_TOKENS__________________');

    const { req, res } = ctx;
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'No refresh token provided.',
      });
    }
    return authService.refreshTokens(refreshToken, res);
  }),
});
