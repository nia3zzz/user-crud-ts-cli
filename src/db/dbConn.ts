import mongoose from "mongoose";

const mongoURI: string | null = process.env.MONGODB_URI || null;

if (!mongoURI) {
  throw new Error("MONGODB_URI is not defined in .env file");
}

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected.");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
