import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import * as cors from 'cors';
import sessionMiddleware from './session/middleware';
import RegisterResolver from './users/resolvers/register';
import Context from './context';
import LoginResolver from './users/resolvers/login';
import MeResolver from './users/resolvers/me';

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, MeResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }): Context => ({ req }),
  });

  const app = express();
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    }),
  );
  app.use(sessionMiddleware());
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    // eslint-disable-next-line no-console
    console.log('Server running on 4000');
  });
};

main();
