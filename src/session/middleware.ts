import * as connectRedis from 'connect-redis';
import * as session from 'express-session';
import redis from './redis';

const RedisStore = connectRedis(session);

const sessionMiddleware = () =>
  session({
    store: new RedisStore({
      client: redis,
    }),
    name: 'qid',
    secret: 'aslkdfjoiq12312',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    },
  });

export default sessionMiddleware;
