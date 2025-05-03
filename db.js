import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv({ path: "./config.env" });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;