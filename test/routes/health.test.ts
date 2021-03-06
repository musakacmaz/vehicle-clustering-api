import { build } from '../helper';

const app = build();

test('health route', async () => {
  const res = await app.inject({
    url: '/health',
    method: 'GET',
  });
  expect(res.json()).toEqual({ result: 'Service Health: OK!' });
});
