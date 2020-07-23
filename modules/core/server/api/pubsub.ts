import { wrapPubSub } from 'apollo-logger';
import { PubSub } from 'graphql-subscriptions';

import { log } from '@bunker42/core-common';
import settings from '@bunker42/config';

const pubsub = settings.app.logging.apolloLogging
  ? wrapPubSub(new PubSub(), { logger: log.debug.bind(log) })
  : new PubSub();

export default pubsub as PubSub;