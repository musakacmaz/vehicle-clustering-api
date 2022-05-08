export const healthSchema = {
  description: 'Service health check endpoint schema',
  tags: ['health'],
  response: {
    200: {
      description: 'Success response',
      type: 'object',
      properties: {
        result: { type: 'string' },
      },
    },
  },
};
