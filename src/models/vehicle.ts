export type Bike = {
  bike_id: string;
  lat: number;
  lon: number;
  is_reserved: boolean;
  is_disabled: boolean;
  vehicle_type_id: string;
  current_range_meters: number;
  pricing_plan_id: string;
  rental_uris: { android: string; ios: string };
};

export type FilterVehiclesQueryParams = {
  lat?: number;
  lon?: number;
  isReserved?: boolean;
  isDisabled?: boolean;
  vehicleTypeId?: string;
  currentRangeMeters?: number;
  pricingPlanId?: string;
};

export type FilterVehiclesQuery = {
  is_reserved?: { $eq: boolean };
  is_disabled?: { $eq: boolean };
  vehicle_type_id?: { $eq: string };
  current_range_meters?: { $gte: number };
  pricing_plan_id?: { $eq: string };
  location?: {
    $near: {
      $geometry: {
        type: 'Point';
        coordinates: [number, number];
      };
      $maxDistance: number;
    };
  };
};
