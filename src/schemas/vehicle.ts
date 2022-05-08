export const filterVehiclesSchema = {
  description: 'Vehicle filtering endpoint schema',
  tags: ['vehicles'],
  querystring: {
    type: 'object',
    properties: {
      lat: { type: 'number' },
      lon: { type: 'number' },
      isReserved: { type: 'boolean' },
      isDisabled: { type: 'boolean' },
      vehicleTypeId: { type: 'string' },
      currentRangeMeters: { type: 'number' },
      pricingPlanId: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Filtered vehicles',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          bike_id: { type: 'string' },
          lat: { type: 'number' },
          lon: { type: 'number' },
          is_reserved: { type: 'boolean' },
          is_disabled: { type: 'boolean' },
          vehicle_type_id: { type: 'string' },
          current_range_meters: { type: 'number' },
          pricing_plan_id: { type: 'string' },
          rental_uris: {
            type: 'object',
            properties: {
              android: { type: 'string' },
              ios: { type: 'string' },
            },
          },
          location: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              coordinates: { type: 'array' },
            },
          },
        },
      },
    },
  },
};
