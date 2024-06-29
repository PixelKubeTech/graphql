import { createDevice, getDevices } from "../controller/player";
const PLAYER_TOPIC = "player";
export const resolvers = {
  Query: {
    getDevices: async (parent, args, context, info) => {
      let result = await getDevices();
      return result;
    },
  },
  Mutation: {
    createPlayerDevice: async (parent, args, context, info) => {
      let result = await createDevice(args.request);
      console.log(result);
      if (result.statusCode === 200) {
        context.pubSub.publish(PLAYER_TOPIC, {
          type: "createPlayerDevice",
          payload: result.data,
        });
      }
      return result;
    },
  },
  Subscription: {
    getDevicesLive: {
      subscribe: async (parent, args, context, info) => {
        return context.pubSub.subscribe(PLAYER_TOPIC);
      },
      resolve: (result) => {
        return {
          data: result["payload"],
          statusCode: 200,
          status: true,
          message: "stream data",
        };
      },
    },
  },
};
