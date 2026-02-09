/**
 * Custom routes for publication
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/publications/by-country/:country',
      handler: 'publication.findByCountry',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};