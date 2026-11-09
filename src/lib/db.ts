import mongoose from "mongoose";

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;
  if (uri) return uri;
  if (process.env.NODE_ENV === "production") {
    throw new Error("MONGODB_URI is not set. Add your MongoDB Atlas connection string to the environment.");
  }
  return "mongodb://127.0.0.1:27017/little-mounties";
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(getMongoUri(), { bufferCommands: false }).catch((err) => {
      // Do not cache a failed connection: the next request must be able to retry.
      cached.promise = null;
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
