export default ({ env }) => ({
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 100000000, // 100MB
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
      security: {
        allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        maxFileSize: 10 * 1024 * 1024, // 10MB
      },
    },
  },
});