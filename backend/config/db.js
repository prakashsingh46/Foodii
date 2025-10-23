import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://prakashsingh8738_db_user:CBCidhTpSYN2f273@cluster0.vjpuw4w.mongodb.net/food-del').then(()=>{
        console.log("DB connected")
    })
}