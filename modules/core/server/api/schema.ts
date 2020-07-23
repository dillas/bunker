import { makeExecutableSchema } from 'graphql-tools';
import ServerModule from '@bunker42/module-server';

import rootSchemaDef from './rootSchema.graphql';
import pubsub from './pubsub';

export const createSchema = (modules: ServerModule) =>
  makeExecutableSchema({
    typeDefs: [rootSchemaDef].concat(modules.schema),
    resolvers: modules.createResolvers(pubsub)
  });