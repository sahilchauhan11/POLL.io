import mongoose from "mongoose";
export default async function connection() {
    try {
         mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        
    } catch (error) {
        process.exit(1);
    }
}