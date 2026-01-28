// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const { STRAPI_ADMIN_EMAIL, STRAPI_ADMIN_PASSWORD, STRAPI_ADMIN_FIRSTNAME, STRAPI_ADMIN_LASTNAME } = process.env;

    console.log('Bootstrap running - checking admin creation...');
    
    if (STRAPI_ADMIN_EMAIL && STRAPI_ADMIN_PASSWORD) {
      const existingUser = await strapi.db.query('admin::user').findOne({ where: { email: STRAPI_ADMIN_EMAIL } });
      if (!existingUser) {
        const superAdminRole = await strapi.db.query('admin::role').findOne({ where: { code: 'strapi-super-admin' } });
        
        await strapi.admin.services.user.create({
          email: STRAPI_ADMIN_EMAIL,
          password: STRAPI_ADMIN_PASSWORD,
          firstname: STRAPI_ADMIN_FIRSTNAME || 'Admin',
          lastname: STRAPI_ADMIN_LASTNAME || 'User',
          isActive: true,
          roles: [superAdminRole.id]
        });
        console.log(`Admin user created: ${STRAPI_ADMIN_EMAIL}`);
      } else {
        console.log(`Admin already exists: ${STRAPI_ADMIN_EMAIL}`);
      }
    } else {
      console.log('No admin credentials provided in environment variables');
    }
  },
};
