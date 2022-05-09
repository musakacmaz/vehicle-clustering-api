import { getTimeToExpire, isExpired, queryBuilder } from '../../src/helpers';
import { FilterVehiclesQueryParams } from '../../src/models/vehicle';

describe('helper functions', () => {
  test('queryBuilder', () => {
    const queryString: FilterVehiclesQueryParams = {
      isReserved: true,
      isDisabled: false,
      vehicleTypeId: '5e9f8f8f8f8f8f8f8f8f8f8',
      currentRangeMeters: 1000,
      pricingPlanId: '5e9f8f8f8f8f8f8f8f8f8f8',
      lat: 1.234,
      lon: 1.234,
    };

    const query = queryBuilder(queryString);

    expect(query).toEqual({
      is_reserved: { $eq: true },
      is_disabled: { $eq: false },
      vehicle_type_id: { $eq: '5e9f8f8f8f8f8f8f8f8f8f8' },
      current_range_meters: { $gte: 1000 },
      pricing_plan_id: { $eq: '5e9f8f8f8f8f8f8f8f8f8f8' },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [1.234, 1.234],
          },
          $maxDistance: 1000,
        },
      },
    });
  });

  test('isExpired', () => {
    const expirationDate = 1589723200;
    expect(isExpired(expirationDate)).toBe(true);
  });

  test('getTimeToExpire', () => {
    const expirationDate = Date.now() / 1000 + 3600;
    expect(getTimeToExpire(expirationDate)).toBeGreaterThan(0);
  });
});
