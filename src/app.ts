import { join } from 'path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import Swagger from '@fastify/swagger';
import { fastifyMongodb } from '@fastify/mongodb';
import { FastifyPluginAsync } from 'fastify';
import { swaggerOptions } from './configs/swagger';
import { NODE_ENV, DB_URL } from './configs';

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!

  // Registering swagger plugin
  fastify.register(Swagger, swaggerOptions);

  // Configure DB
  if (NODE_ENV !== 'test') {
    fastify
      .register(fastifyMongodb, {
        forceClose: true,
        url: DB_URL,
      })
      .after((err) =>
        err
          ? fastify.log.error('MongoDB Error -> ', err)
          : fastify.log.info('MongoDB Connected...')
      );
  }

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  });
};

export default app;
export { app };
