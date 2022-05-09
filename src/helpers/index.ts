import { MAX_DISTANCE } from '../configs';
import {
  FilterVehiclesQueryParams,
  FilterVehiclesQuery,
} from '../models/vehicle';

export function queryBuilder(
  queryString: FilterVehiclesQueryParams
): FilterVehiclesQuery {
  let query: FilterVehiclesQuery = {};

  if (queryString.isReserved !== undefined) {
    query = { ...query, is_reserved: { $eq: queryString.isReserved } };
  }

  if (queryString.isDisabled !== undefined) {
    query = { ...query, is_disabled: { $eq: queryString.isDisabled } };
  }

  if (queryString.vehicleTypeId) {
    query = { ...query, vehicle_type_id: { $eq: queryString.vehicleTypeId } };
  }

  if (queryString.currentRangeMeters) {
    query = {
      ...query,
      current_range_meters: { $gte: queryString.currentRangeMeters },
    };
  }

  if (queryString.pricingPlanId) {
    query = { ...query, pricing_plan_id: { $eq: queryString.pricingPlanId } };
  }

  if (queryString.lat && queryString.lon) {
    query = {
      ...query,
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [queryString.lon, queryString.lat],
          },
          $maxDistance: MAX_DISTANCE,
        },
      },
    };
  }

  return query;
}

export function isExpired(expirationDate: number): boolean {
  return Math.floor(Date.now() / 1000) > expirationDate;
}

export function getTimeToExpire(expirationDate: number): number {
  return expirationDate - Math.floor(Date.now() / 1000);
}
