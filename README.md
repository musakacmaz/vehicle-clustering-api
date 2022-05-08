# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)

This project was bootstrapped with Fastify-CLI.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).

# Vehicle Clustering API

We would like to learn more about how you approach challenges as an Engineer. To that
end, we have an exercise we would like you to work on.
You are working on a product capable of dynamically clustering (thus aggregating) vehicle
data (location, availability, pricing information). The service's primary goal is to provide the
data via an API to visualize vehicle clusters on a map. Filtering vehicles (e.g., based on
availability/location/other attributes) should be possible by passing parameters to the
service. Design the API + the endpoints (you have complete freedom) and implement the
business logic that processes data from downstream services and makes it available to
clients.

## Considerations:

- The service should implement the business logic and perform data processing/transformation.

- The service should expose the data to the client in an easily consumable/usable format.

- The service should be able to filter data based on different attributes

- The code should be produced and verified up to production standards

- The service should expose basic metrics that enable monitoring & alerting

- The service should be easily testable on the local machine (including manual tests)

- [Bonus] Automation should be in place to support continuous delivery (placeholders are fine, making actual production deployment is unnecessary).

- [Bonus] performance optimization

- [Bonus] The service should be self-documenting, enabling developers to explore the
  API.

For obtaining vehicle data, please use one of our publicly available API endpoints based on
the GBFS standard: https://data-sharing.tier-services.io/tier_paris/gbfs/2.2

- The final deliverable should link to an accessible Git repository containing all of the code necessary to build and run the app and a README with relevant information.
- Please do not spend more than 3-4 hours on the implementation at home!
- Good luck and have fun!

## Remarks

- We love the unit and functional testing.
- We care about simplicity & clarity, not the framework
- We use nodeJS (typescript) and python in production
