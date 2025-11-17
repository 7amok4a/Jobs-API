import express from "express" ; 
import dotenv from "dotenv" ; 
import routerAuth from "./routers/auth.router.js"; 
import routerJob from "./routers/jobs.router.js" ; 
import notFoundMiddleware from "./middleware/notFoundHandler.js" ; 
import errorHandlerMiddleware from "./middleware/errorHandler.js" ; 
import createConnectionDb from "./database/connect.js";
import authMiddleware from "./middleware/authentication.js";

//security 
import helmet from "helmet" ; 
//import xss from "xss-clean" ; // unused package  
import rateLimit from "express-rate-limit";
import cors from "cors" ; 
dotenv.config() ; 

const PORT = process.env.PORT ;
const DB_URL  = process.env.DB_URL ; 
const app = express() ; 

app.set("trust proxy", 1);
app.use(rateLimit({
    windowMs : 15*60*1000 , 
    max : 100 , // 100 request for per windowMs
}))
app.use(express.json()) ;
app.use(helmet()) ;  
app.use(cors()) ; 
//app.use(xss()) ; 

app.use("/api/v1/auth" , routerAuth) ; 
app.use("/api/v1/jobs" , authMiddleware, routerJob);
app.use(notFoundMiddleware) ; 
app.use(errorHandlerMiddleware) ; 

const start = async()=> {
    try {   
        await createConnectionDb(DB_URL) ;  
        app.listen(PORT , () => {console.log(`Server is Running in http://localhost:${PORT}`)}) ; 
    }catch(err) {
        console.log(err) ; 
    }
}


start() ; 