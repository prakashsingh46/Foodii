import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/FoodRoute.js";
import userRouter from "./routes/UserRoute.js";
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app=express();
const port=4000

//middleware
app.use(express.json())
app.use(cors())

// DB connection
connectDB();

// API end points
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter );
app.use("/api/order", orderRouter)

app.use("/images", express.static('uploads'));


app.get("/", (req, res)=>{
    res.send("API Working");
})
app.listen(port, ()=>{
    console.log(`Server started on port no ${port}`);
})