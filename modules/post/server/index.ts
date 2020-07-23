import ServerModule from '@bunker42/module-server';

import Post from './sql';
import schema from './schema.graphql';
import createResolvers from './resolvers';

export default new ServerModule({
  schema: [schema],
  createResolversFunc: [createResolvers],
  createContextFunc: [() => ({ Post: new Post() })]
});