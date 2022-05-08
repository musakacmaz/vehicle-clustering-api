import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { healthSchema } from '../../schemas/health';
import { HealthResponseType } from '../../models/health';

const health: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get(
    '',
    {
      schema: healthSchema,
    },
    async (
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<HealthResponseType> =>
      reply.code(200).send({ result: 'Service Health: OK!' })
  );
};

export default health;
