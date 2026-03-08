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
  },

  async findByCountry(ctx) {
    const { country } = ctx.params;
    
    try {
      // Find admin user with username matching the country (case-insensitive)
      const adminUser = await strapi.db.query('admin::user').findOne({
        where: { 
          username: { $eqi: country } 
        }
      });
      
      if (!adminUser) {
        return ctx.notFound(`No Admin and Publications found for country: ${country}`);
      }
      
      // Get publications created by this admin using direct database query
      const publicationIds = await strapi.db.connection.raw(
        `SELECT id FROM publications WHERE created_by_id = ? AND published_at IS NOT NULL ORDER BY publication_number DESC`,
        [adminUser.id]
      );
      
      const publications = [];
      
      // Fetch full publication data for each ID
      for (const row of publicationIds) {
        const pub = await strapi.entityService.findOne('api::publication.publication', row.id, {
          populate: {
            pdfFile: true,
            country: true
          }
        });
        if (pub) {
          publications.push(pub);
        }
      }
      
      // Get member state info for the country
      const memberState = await strapi.entityService.findMany('api::member-state.member-state', {
        filters: {
          country: country
        },
        populate: {
          flag: true,
          parliamentFlag: true
        },
        limit: 1
      });
      
      return {
        data: publications,
        meta: {
          country: country,
          adminUser: {
            id: adminUser.id,
            username: adminUser.username,
            name: `${adminUser.firstname || ''} ${adminUser.lastname || ''}`.trim()
          },
          memberState: memberState[0] || null,
          total: publications.length
        }
      };
    } catch (error) {
      strapi.log.error('Error in findByCountry:', error);
      return ctx.badRequest('Failed to fetch publications by country');
    }
  }
}));
