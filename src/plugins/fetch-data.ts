import axios from 'axios';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import redis from '../config/redis';
import { Bike } from '../models/vehicle';
import { EXTERNAL_API_URL } from '../config';
import { isExpired } from '../helpers';

const dataFetcherPlugin = async function (fastify: FastifyInstance) {
  // Get collection from mongodb
  const vehicles = fastify.mongo.db?.collection('vehicles');
  // Get expiration time from redis
  const expirationDate = await redis.get('expirationDate');
  // If data is expired, fetch it from external API and store it in the database
  if (!expirationDate || isExpired(Number(expirationDate))) {
    const response = await axios
      .get(EXTERNAL_API_URL + '/free-bike-status')
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      // Clear database
      await vehicles?.deleteMany({});
      // Deconsruct response
      const { data, last_updated, ttl } = response.data;
      // Attach location to each bike for geospatial queries
      const bikes = data.bikes.map((bike: Bike) => ({
        ...bike,
        location: { coordinates: [bike.lon, bike.lat], type: 'Point' },
      }));
      // Insert bikes in the database
      await vehicles?.insertMany(bikes);
      // Create index on location field
      await vehicles?.createIndex({ location: '2dsphere' });
      // Set expiration date in redis
      await redis.set('expirationDate', last_updated + ttl);
    }
  }
};

export default fp(dataFetcherPlugin);
