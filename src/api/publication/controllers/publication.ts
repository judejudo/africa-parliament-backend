/**
 * publication controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::publication.publication' as any, ({ strapi }) => ({
  async find(ctx) {
    // Override with safe population and include drafts
    ctx.query.populate = {
      pdfFile: true,
      country: true
    };
    
    // Include both published and draft publications
    ctx.query.publicationState = 'preview';
    
    const result = await super.find(ctx);
    
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
      
      // Get publications created by this admin using Strapi query builder
      const publications = await strapi.entityService.findMany('api::publication.publication', {
        filters: {
          createdByUser: adminUser.id,
        },
        populate: {
          pdfFile: true,
          country: true
        },
        sort: { publicationNumber: 'desc' }
      });
      
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
