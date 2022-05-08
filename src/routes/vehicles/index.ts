import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { filterVehiclesSchema } from '../../schemas/vehicle';
import { FilterVehiclesQueryParams } from '../../models/vehicle';
import fetchAndInsertData from '../../plugins/fetch-data';
import { getTimeToExpire, isExpired, queryBuilder } from '../../helpers';
import redis from '../../config/redis';

const vehicles: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get(
    '/filter',
    {
      schema: filterVehiclesSchema,
      preHandler: async (request, reply, done) => {
        // Fetch data from external API if needed (data is outdated or missing) and store it in the database
        await fetchAndInsertData(fastify, {});
        done();
      },
    },
    async (
      request: FastifyRequest<{ Querystring: FilterVehiclesQueryParams }>,
      reply: FastifyReply
    ): Promise<void> => {
      // Get collection from mongodb
      const vehicles = fastify.mongo.db?.collection('vehicles');
      // Build query from querystring
      const query = queryBuilder(request.query);
      // Get data expiration date from redis
      const expirationDate = await redis.get('expirationDate');
      // Check if data is expired
      if (expirationDate && !isExpired(Number(expirationDate))) {
        // If not, return data from redis (if available)
        let result;
        try {
          result = await redis.get(JSON.stringify(query));
        } catch (error) {
          console.error(error);
        }
        if (result) {
          reply.code(200).send(JSON.parse(result));
        } else {
          // If it is not available, return data from mongodb
          const result = await vehicles?.find(query).toArray();
          // Store data in redis
          await redis.set(JSON.stringify(query), JSON.stringify(result), {
            EX: getTimeToExpire(Number(expirationDate)),
          });
          // Return result
          reply.code(200).send(result);
        }
      } else {
        // Find vehicles in the database
        const result = await vehicles?.find(query).toArray();
        // Return result
        reply.code(200).send(result);
      }
    }
  );
};

export default vehicles;
