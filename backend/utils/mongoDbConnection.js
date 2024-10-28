import mongoose from "mongoose";
export default async function connection() {
    try {
         mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
         console.log('MongoDB connected');
    } catch (error) {
        console.log('MongoDB connection failed:', error.message);
    }
}