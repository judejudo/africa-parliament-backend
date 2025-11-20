/**
 * publication controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::publication.publication' as any, ({ strapi }) => ({
  // Override find method to handle email filtering
  async find(ctx) {
    // Check if frontend sent userEmail parameter
    if (ctx.query.userEmail) {
      const userEmail = ctx.query.userEmail;
      
      try {
        // Find admin user by email
        const users = await strapi.entityService.findMany('admin::user', {
          filters: { email: userEmail },
          fields: ['id', 'email']
        });
        
        if (users.length > 0) {
          const userId = users[0].id;
          console.log(`Found user with email ${userEmail}, ID: ${userId}`);
          
          // Use super.find() to get the same results as the default API
          const allPubs = await super.find(ctx);
          console.log(`All publications from super.find():`, (allPubs as any).data.map(p => ({ 
            id: p.id, 
            title: p.title, 
            createdBy: (p as any).createdBy, 
            publishedAt: p.publishedAt 
          })));
          
          // Get the actual created_by_id values from database for each publication
          const publicationIds = (allPubs as any).data.map(p => p.id);
          
          if (publicationIds.length > 0) {
            // Query database to get created_by_id for these publications
            const dbResults = await strapi.db.connection.raw(
              `SELECT id, created_by_id FROM publications WHERE id IN (${publicationIds.join(',')}) AND created_by_id = ?`,
              [userId]
            );
            
            const userPublicationIds = dbResults.map(row => row.id);
            console.log(`Publications created by user ${userId}:`, userPublicationIds);
            
            // Filter publications to only include those created by this user
            const filteredPubs = (allPubs as any).data.filter(pub => 
              userPublicationIds.includes(pub.id)
            );
            
            console.log(`Found ${filteredPubs.length} publications for user ${userId}`);
            
            return {
              data: filteredPubs,
              meta: {
                pagination: {
                  page: 1,
                  pageSize: 10,
                  pageCount: Math.ceil(filteredPubs.length / 10),
                  total: filteredPubs.length
                }
              }
            };
          }
          
          return { data: [], meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } } };
        }
        
        return { data: [], meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } } };
      } catch (error) {
        console.error('Error finding publications by email:', error);
        return { data: [], meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } } };
      }
    }
    
    // Default behavior for other requests
    return super.find(ctx);
  },

  // Create method - lifecycle hook handles publicationNumber generation
  async create(ctx) {
    return super.create(ctx);
  }
}));
