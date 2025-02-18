import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "your_mongodb_connection_string";

let cached = global.mongoose || null;

export async function connectToDatabase() {
  if (cached) return cached;

  try {
    cached = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
    return cached;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
