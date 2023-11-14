import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true); // prevent unknown field queries

  if (!process.env.MONGODB_URL) return console.log("MISSING MONGODB_URL");

  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflow",
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    isConnected = true;

    console.log("MongoDB is connected");
  } catch (error: any) {
    console.log(`Error DB: ${error.message}`);
  }
};
