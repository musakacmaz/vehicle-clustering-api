import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { filterVehiclesSchema } from '../../schemas/vehicle';
import { FilterVehiclesQueryParams } from '../../models/vehicle';
import fetchAndInsertData from '../../plugins/fetch-data';
import { queryBuilder } from '../../helpers';

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
      // Find vehicles matching query
      const result = await vehicles?.find(query).toArray();
      // Return result
      reply.code(200).send(result);
    }
  );
};

export default vehicles;
