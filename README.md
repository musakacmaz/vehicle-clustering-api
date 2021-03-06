# Vehicle Clustering API

## ð¯ Target

The aim of this project is building an API that fetches vehicle data(location, availability, pricing information) from external API and dynamically clustering it. Filtering vehicles (e.g., based on availability/location/other attributes) possible by passing parameters to the `/vehicles/filter` endpoint.

## ðï¸ Project Structure

![Activity Diagram](/assets/activity-diagram.png)

## ð» Tech Stack

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://www.fastify.io/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Jest](https://jestjs.io/)
- [Docker](https://www.docker.com/)
- [Swagger](https://swagger.io/)

## ð Setup & Run

You need [Docker](https://www.docker.com/) to run this project.

Run the following command to start the project:

```bash
npm run start:dev
```

Service should be running on [http://127.0.0.1:3000](http://127.0.0.1:3000).

## ð Documentation

Swagger API documentation is available on [http://127.0.0.1:3000/documentation](http://127.0.0.1:3000/documentation).

## ð§ª Testing

Run the following command to run the tests:

```bash
npm run test
```

## â¨ Linting

Run the following command to lint the code:

```bash
npm run lint
```

## âï¸ License

[MIT Â© musa kaÃ§maz](https://musakacmaz.mit-license.org)
