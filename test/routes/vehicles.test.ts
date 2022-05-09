import { build } from '../helper';

const app = build();

test('vehicle filter route', async () => {
  const res = await app.inject({
    url: '/vehicles/filter',
    method: 'GET',
    query: {
      pricingPlanId: '96608a7f-e2b7-4a8c-aeb7-19524c93b4c3',
      vehicleTypeId: 'escooter_paris',
    },
  });

  expect(res.statusCode).toBe(200);
  expect(res.json()).toBeDefined();
  expect(res.json().length).toBeGreaterThan(0);
  expect(res.json()[0].pricing_plan_id).toBe(
    '96608a7f-e2b7-4a8c-aeb7-19524c93b4c3'
  );
  expect(res.json()[0].vehicle_type_id).toBe('escooter_paris');
});
