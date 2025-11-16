import express from "express" ; 
import dotenv from "dotenv" ; 
import routerAuth from "./routers/auth.router.js"; 
import routerJob from "./routers/jobs.router.js" ; 
import notFoundMiddleware from "./middleware/notFoundHandler.js" ; 
import errorHandlerMiddleware from "./middleware/errorHandler.js" ; 
import createConnectionDb from "./database/connect.js";
import authMiddleware from "./middleware/authentication.js";
dotenv.config() ; 

const PORT = process.env.PORT ;
const DB_URL  = process.env.DB_URL ; 
const app = express() ; 



app.use(express.json()) ; 
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