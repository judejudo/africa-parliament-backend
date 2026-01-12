export default {
  routes: [
    {
      method: 'GET',
      path: '/patrons/current',
      handler: 'patron.findCurrent',
      config: {
        auth: false,
      },
    },
  ],
};