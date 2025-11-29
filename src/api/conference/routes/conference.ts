/**
 * conference router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::conference.conference', {
  config: {
    find: { auth: false },
    findOne: { auth: false },
  }
});