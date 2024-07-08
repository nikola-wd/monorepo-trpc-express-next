import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import { prisma } from '../db';
import { ACCESS_TOKEN_SECRET } from './jwt';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ACCESS_TOKEN_SECRET,
};

passport.use(
  'jwt',
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      console.log('JWT PAYLOAD: ', jwt_payload);

      // Check token expiration
      if (Date.now() >= jwt_payload.exp * 1000) {
        return done(null, false, { message: 'Token expired' });
      }

      const user = await prisma.user.findUnique({
        where: { id: jwt_payload.id },
      });

      if (user) {
        // Additional check: ensure user is active
        // if (user.isActive === false) {
        //   return done(null, false, { message: 'User is inactive' });
        // }
        return done(null, user);
      } else {
        return done(null, false, { message: 'User not found' });
      }
    } catch (err) {
      console.error('Error in JWT strategy:', err);
      return done(err, false);
    }
  })
);

export default passport;
