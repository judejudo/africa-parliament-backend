/**
 * member-state router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::member-state.member-state', {
  config: {
    find: { auth: false },
    findOne: { auth: false },
  }
});