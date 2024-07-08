import { TRPCError } from '@trpc/server';
import { publicProcedure } from '../trpc';

export const authGuardProcedure = publicProcedure.use(async (opts) => {
  const { ctx, next } = opts;

  const user = await ctx.getUser();

  if (!user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      ...ctx,
      user,
    },
  });
});
