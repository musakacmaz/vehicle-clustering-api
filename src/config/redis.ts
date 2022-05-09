import { createClient } from 'redis';

const redis = createClient({
  socket: {
    host: 'redis',
  },
});

redis.on('error', (err) => console.error('Redis Error!', err));

if (process.env.NODE_ENV !== 'test') {
  (async () => {
    await redis.connect();
  })();
}

export default redis;
