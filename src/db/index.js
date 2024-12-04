import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const dbConnect = async ()=> {
    try {
       const connectionInstance  = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST  ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error("MongoDB connection Error : ",error);
        throw error
        process.exit(1);
    }
}


export default dbConnect