import { createTRPCRouter } from '../trpc';
import { authRouter } from './auth.router';
import { postRouter } from './post.router';
import { userRouter } from './user.router';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
