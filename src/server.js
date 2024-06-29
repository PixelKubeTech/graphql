import { createServer } from 'node:http'
import { createSchema, createYoga, createPubSub } from 'graphql-yoga'
import { resolvers } from './resolvers/player'
import { Redis } from 'ioredis'
import { createRedisEventTarget } from '@graphql-yoga/redis-event-target'
// Redis configuration
// const redisHost = 'redis';
// const redisPort =  6379;

// const options = {
//   host: redisHost,
//   port: redisPort,
// };

// const publishClient = new Redis(options)
// const subscribeClient = new Redis(options)
// const eventTarget = createRedisEventTarget({
//   publishClient,
//   subscribeClient
// })
import * as fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()
const devices = [];
// const pubSub = createPubSub({
//   eventTarget: eventTarget
// })
const pubSub = createPubSub()
// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync(
      './src/schema/schema.graphql',
      'utf-8'
    ),
    resolvers: {
      Query: resolvers.Query,
      Mutation: resolvers.Mutation,
      Subscription: resolvers.Subscription
    },

  }),
  context: {
    pubSub: pubSub,
    devices: devices
  }
})

// Pass it into a server to hook into request handlers.
const server = createServer(yoga)

// Start the server and you're done!
const port = process.env.PORT || 4000;
server.listen({ port }, () => {
  console.log(`The server is up on port ${port}!`);
});