import { errors } from '@strapi/utils';

export default {
  async beforeCreate(event) {
    const { data } = event.params;
    
    // Auto-set publication date to today if not provided
    if (!data.datePublished) {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      data.datePublished = today;
      console.log(`Auto-set publication date to: ${today}`);
    }
    
    // Validate that publication date is not in the future
    const pubDate = new Date(data.datePublished);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today
    
    if (pubDate > today) {
      // Use proper ValidationError import
      throw new errors.ValidationError('Publication date cannot be in the future. Please select today or an earlier date.');
    }
    
    // Only generate publicationNumber if not already set
    if (!data.publicationNumber) {
      try {
        // Use a simpler, faster query
        const lastPub = await strapi.entityService.findMany('api::publication.publication', {
          sort: { id: 'desc' },
          limit: 1,
          fields: ['id']
        });
        
        // Use ID + 1 as a simple incrementing number
        const nextNumber = lastPub.length > 0 ? Number(lastPub[0].id) + 1 : 1;
        data.publicationNumber = nextNumber;
        
        console.log(`Generated publication number: ${nextNumber}`);
      } catch (error) {
        console.error('Error generating publication number:', error);
        // Use timestamp as fallback to ensure uniqueness
        data.publicationNumber = Date.now() % 10000;
      }
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;
    
    // Validate publication date on updates too
    if (data.datePublished) {
      const pubDate = new Date(data.datePublished);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // End of today
      
      if (pubDate > today) {
        // Use proper ValidationError import
        throw new errors.ValidationError('Publication date cannot be in the future. Please select today or an earlier date.');
      }
    }
  }
};
