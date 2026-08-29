import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


app.use(cors({
    orgin: process.env.CORS_ORIGIN
}))


app.use(express.json({
    limit:"16kb"
}))
app.use(express.urlencoded({
    extended: true,
    limit: "20kb"
}))
app.use(express.static("public"))
app.use(cookieParser())



//routes import

import userRouter from "./routs/user.routs.js";



//routes declaration
app.use("/api/v1/users", userRouter)




export { app };