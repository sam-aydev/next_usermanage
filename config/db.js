import mongoose from "mongoose";

export default async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongodb")
    }catch(error){
        console.error(error.message);
        process.exit(1);
    }
}