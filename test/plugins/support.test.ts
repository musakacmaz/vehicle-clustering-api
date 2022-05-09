import { build } from '../helper';

const app = build();

test('support works standalone', async () => {
  expect(app.someSupport()).toEqual('hugs');
});
