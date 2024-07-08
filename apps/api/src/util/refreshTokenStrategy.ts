// utils/refreshTokenStrategy.ts
import { Strategy as JwtStrategy } from 'passport-jwt';
import passport from 'passport';
import { prisma } from '../db';
import { Request } from 'express';
import { REFRESH_TOKEN_SECRET } from './jwt';

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req?.cookies) {
    token = req.cookies['refreshToken'];
  }
  return token;
};

const refreshOpts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: REFRESH_TOKEN_SECRET,
};

passport.use(
  'jwt-refresh',
  new JwtStrategy(refreshOpts, async (jwt_payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwt_payload.id },
      });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
