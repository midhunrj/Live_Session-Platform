import express,{ Express } from "express";
import { log } from "node:console";
import dotenv from 'dotenv'
import cors,{ CorsOptions } from "cors";
import { connectDB } from "./infrastructure/database/mongoconnection";
import userRouter from "./presentation/routes/userRoutes";
import creditRouter from "./presentation/routes/creditRoutes";
import sessionRouter from "./presentation/routes/sessionRoutes";
import cookieParser from "cookie-parser";

dotenv.config()
const app=express()
app.use(cookieParser())

app.use(express.json())
const corsOptions = {
    origin: [process.env.CLIENT_URL!, "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
};
app.use(cors(corsOptions)) 
// app.options("*",cors(corsOptions))
connectDB()

app.use('/',userRouter)
app.use('/credits',creditRouter)
app.use('/session',sessionRouter)
const port = process.env.PORT
app.listen(port,()=>{
    console.log("server running at the port",port);
    
})