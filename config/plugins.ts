export default ({ env }) => ({
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 100000000,
      },
      responsiveDimensions: false,
    },
  },
});