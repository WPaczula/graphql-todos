import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import * as cors from 'cors';
import sessionMiddleware from './session/middleware';
import UserResolvers from './modules/users/resolvers';
import Context from './context';

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [...UserResolvers],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }): Context => ({ req, res }),
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
