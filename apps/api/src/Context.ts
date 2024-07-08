import { Request, Response } from 'express';
import { inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import passport from './util/passport';
import { ICurrentUser } from './types/CurrentUser';

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return {
    req: req as Request,
    res: res as Response,
    getUser: () =>
      new Promise<ICurrentUser | null>((resolve) => {
        passport.authenticate(
          'jwt',
          { session: false },
          (err: Error | null, user: ICurrentUser | undefined) => {
            console.log('INSIDE CREATE CONTEXT USER: ', user);
            if (err) {
              console.error('Authentication error:', err);
              resolve(null);
            } else if (user) {
              resolve(user as ICurrentUser);
            } else {
              resolve(null);
            }
          }
        )(req, res);
      }),
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
