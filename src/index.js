import dotenv from 'dotenv';

import dns from "dns";
import {app} from "./app.js"

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import connectDB from "./db/index.js";


dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000 , () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Mongodb Connection failed !!!", err);
})








/*
import express from "express"
const app = express()

( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listeningon port ${process.env.PORT}`);
        })

    }catch (error){
        console.log("ERROR: ", error)
        throw error
    }
})()*/