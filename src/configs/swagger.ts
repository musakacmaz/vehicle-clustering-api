export const swaggerOptions = {
  routePrefix: '/documentation',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Vehicle Clustering API',
      description: 'Vehicle Clustering API Documentation.',
      version: '1.0.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: '127.0.0.1:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    apis: ['./src/routes/*.ts'],
  },
};
