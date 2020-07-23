import ServerModule from '@bunker42/module-server';

import { createServer } from './entry';

export { serverPromise } from './entry';
export { createSchema } from './api/schema';

export default new ServerModule({
  onAppCreate: [createServer]
});