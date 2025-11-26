export default (config, { strapi }) => {
  return async (ctx, next) => {
    await next();
    
    // Check if this is a Content Manager request for publications
    if (ctx.request.url.includes('/content-manager/collection-types/api::publication.publication') && 
        ctx.method === 'GET' && 
        ctx.state.user?.id) {
      
      const adminUserId = ctx.state.user.id;
      
      // If response has data, filter it
      if (ctx.body?.results) {
        const publicationIds = ctx.body.results.map(p => p.id);
        
        if (publicationIds.length > 0) {
          const dbResults = await strapi.db.connection.raw(
            `SELECT id FROM publications WHERE id IN (${publicationIds.join(',')}) AND created_by_id = ?`,
            [adminUserId]
          );
          
          const userPublicationIds = dbResults.map(row => row.id);
          
          // Filter results to only include user's publications
          ctx.body.results = ctx.body.results.filter(pub => 
            userPublicationIds.includes(pub.id)
          );
          
          // Update pagination
          ctx.body.pagination.total = ctx.body.results.length;
          ctx.body.pagination.pageCount = Math.ceil(ctx.body.results.length / ctx.body.pagination.pageSize);
        }
      }
    }
  };
};
