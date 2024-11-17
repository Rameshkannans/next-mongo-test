import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false; // Prevent multiple connections

const connectMongo = async () => {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);  // No need for useNewUrlParser or useUnifiedTopology
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

export default connectMongo;
