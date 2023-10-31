import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", false); // prevent unknown field queries

  if (!process.env.MONGODB_URL) return console.log("MISSING MONGODB_URL");

  if (isConnected) return console.log("MongoDB is already connected");

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    isConnected = true;

    console.log("MongoDB is connected");
  } catch (error: any) {
    console.log(`Error DB: ${error.message}`);
  }
};
