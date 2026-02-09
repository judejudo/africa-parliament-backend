/**
 * publication controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::publication.publication' as any, ({ strapi }) => ({
  async find(ctx) {
    console.log('Query before:', ctx.query);
    
    // Check database directly
    const dbPubs = await strapi.db.query('api::publication.publication').findMany({
      select: ['id', 'title'],
      populate: { country: { select: ['id', 'country'] } }
    });
    console.log('Direct DB query:', dbPubs);
    
    // Check if country column exists in publications table
    const tableInfo = await strapi.db.connection.raw("PRAGMA table_info(publications)");
    console.log('Publications table columns:', tableInfo.map(col => col.name));
    
    // Fetch member states for debugging
    const memberStates = await strapi.entityService.findMany('api::member-state.member-state', {
      fields: ['id', 'country']
    });
    console.log('Available member states:', memberStates);
    
    // Override with safe population and include drafts
    ctx.query.populate = {
      pdfFile: true,
      country: true
    };
    
    // Include both published and draft publications
    ctx.query.publicationState = 'preview';
    
    const result = await super.find(ctx);
    console.log('Country data check:', result.data?.map(p => ({ id: p.id, country: p.country })));
    
    return result;
  },

  async create(ctx) {
    return super.create(ctx);
  }
}));
