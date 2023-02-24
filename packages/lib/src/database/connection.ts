import mongoose, { ConnectOptions } from "mongoose";

declare module global {
  // eslint-disable-next-line vars-on-top, no-var -- --
  var _mongooseClient: Promise<typeof mongoose>;
}

const options: ConnectOptions = {
  bufferCommands: false,
  writeConcern: {
    w: "majority",
  },
  retryWrites: true,
  maxIdleTimeMS: 10000,
};
// eslint-disable-next-line import/no-mutable-exports -- --
let mongooseClient: Promise<typeof mongoose>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongooseClient) {
    console.log("making new DB connection");
    global._mongooseClient = mongoose.connect(
      process.env.MONGODB_URI as string,
      options
    );
  }
  console.log("using saved DB connection");
  mongooseClient = global._mongooseClient;
} else {
  mongooseClient = mongoose.connect(process.env.MONGODB_URI as string, options);
}

export { mongooseClient };
