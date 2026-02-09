/**
 * member-state controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::member-state.member-state' as any, ({ strapi }) => ({
  async find(ctx) {
    // Ensure both flag and parliamentFlag are populated
    ctx.query = {
      ...ctx.query,
      populate: {
        flag: true,
        parliamentFlag: true,
        ...((ctx.query?.populate as any) || {})
      }
    };
    
    return super.find(ctx);
  }
}));