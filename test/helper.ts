// This file contains code that we reuse between our tests.
import Fastify from 'fastify';
import fp from 'fastify-plugin';
import App from '../src/app';
import { fastifyMongodb } from '@fastify/mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Fill in this config with all the configurations
// needed for testing the application
async function config() {
  return {};
}

// Automatically build and tear down our instance
function build() {
  const app = Fastify();

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup

  beforeAll(async () => {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await app
      .register(fastifyMongodb, {
        forceClose: true,
        url: uri,
      })
      .after((err) =>
        err
          ? console.log('MongoDB Error -> ', err)
          : console.log('MongoDB Connected...')
      );
    app.mongo.db = await app.mongo.client.db('test');

    void app.register(fp(App), await config());

    await app.ready();
  });

  afterAll(() => app.close());

  return app;
}

export { config, build };
