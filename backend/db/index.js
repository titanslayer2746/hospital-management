// Import mongoose for MongoDB connection
import mongoose from "mongoose"

/**
 * Database Connection Function
 * Establishes connection to MongoDB using environment variables
 * @throws {Error} If connection fails, process will exit with code 1
 */
const connectDB = async () => {
    try {
        // Connect to MongoDB using URI from environment variables
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\nMongoDB connected !! DB Host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error: ", error)
        // Exit process if database connection fails
        process.exit(1);
    }
}

export default connectDB;