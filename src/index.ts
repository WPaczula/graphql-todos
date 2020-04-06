import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import * as connectRedis from 'connect-redis';
import * as session from 'express-session';
import * as cors from 'cors';
import RegisterResolver from './users/resolvers/register';
import redis from './redis';

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
  });

  const app = express();
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    }),
  );
  const RedisStore = connectRedis(session);
  app.use(
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
    }),
  );
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server running on 4000');
  });
};

main();
