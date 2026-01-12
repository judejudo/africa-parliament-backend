/**
 * patron controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::patron.patron', ({ strapi }) => ({
  async findCurrent(ctx) {
    const currentYear = new Date().getFullYear();
    
    const patrons = await strapi.entityService.findMany('api::patron.patron', {
      populate: '*',
    });

    const currentPatron = patrons.find(patron => {
      const tenure = patron.tenure;
      if (!tenure) return false;
      
      const [startYear, endYear] = tenure.split('-').map(year => parseInt(year.trim()));
      
      if (!startYear) return false;
      if (!endYear) return currentYear >= startYear;
      
      return currentYear >= startYear && currentYear <= endYear;
    });

    if (!currentPatron) {
      return ctx.notFound('No current patron found');
    }

    const sanitizedEntity = await this.sanitizeOutput(currentPatron, ctx);
    return this.transformResponse(sanitizedEntity);
  },
}));