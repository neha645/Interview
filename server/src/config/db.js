import mongoose from "mongoose"
const DB_URI = "mongodb://localhost:27017/interview";
export const connectToDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(`Failed to connect to MongoDB: ${error.message}`);
    }
}
