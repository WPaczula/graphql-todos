import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { buildSchema, Resolver, Query } from 'type-graphql';
import { createConnection } from 'typeorm';

@Resolver()
class HelloResolver {
  @Query(() => String, { name: 'hi' })
  // eslint-disable-next-line class-methods-use-this
  async hello() {
    return 'Hello world';
  }
}

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });
  const apolloServer = new ApolloServer({ schema });

  const app = express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server running on 4000');
  });
};

main();
