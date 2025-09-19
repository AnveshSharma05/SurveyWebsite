// src/lib/mongodb.js
import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
  // If we already have a connection, use it
  if (cached.conn) return cached.conn;

  // If we are connecting for the first time, create a promise
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Prevents queries from waiting if not connected
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    if (!process.env.MONGODB_URI) {
      throw new Error(
        "MONGODB_URI is not defined in .env.local. Make sure the variable name matches exactly."
      );
    }

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, opts)
      .then((mongoose) => mongoose);
  }

  // Wait for connection and cache it
  cached.conn = await cached.promise;
  console.log("MongoDB connected");
  return cached.conn;
}
