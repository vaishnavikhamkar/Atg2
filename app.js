import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./Routes/users.js";
import authRoute from "./Routes/auth.js";
import postRoute from "./Routes/posts.js";

const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());
app.use("/users",userRoute);
app.use("/auth",authRoute);
app.use("/posts",postRoute);

app.get('/', (req, res) => {
    res.send("welcome to the api");
})

// app.listen(5002,()=>{
//     console.log("Welcome to the api");
// })

const PORT=process.env.PORT || 5002;


const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT,()=>console.log(`Server running on port:${PORT}`));
    }
    catch(err){
        console.error("Connection to MongoDB failed",err.message);
    }


}

connectDB();
mongoose.connection.on("open",()=>console.log("Connection to database established successfully"));
mongoose.connection.on("error",(err)=>console.log(err));
