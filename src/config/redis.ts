import { createClient } from 'redis';

const redis = createClient({
  socket: {
    host: 'redis',
  },
});

redis.on('error', (err) => console.log('Redis Error!', err));

(async () => {
  await redis.connect();
})();

export default redis;
