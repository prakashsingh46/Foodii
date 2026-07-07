import mongoose from "mongoose";

export const connectDB = async ()=>{
    if (!process.env.mongoDB_URI) {
        throw new Error("mongoDB_URI environment variable is missing");
    }

    await mongoose.connect(process.env.mongoDB_URI).then(()=>{
        console.log("DB connected")
    })
}
