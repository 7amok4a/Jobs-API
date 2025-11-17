import jwt from "jsonwebtoken" ; 
import Errors from "../errors/index.js" ; 
import dotenv from "dotenv"
//import User from "../models/user.module.js";
dotenv.config({path : '../../.env'}) ; 

const authMiddleware = (req , res , next)=> { 
    const authHeader = req.headers.authorization ; 
    if (!authHeader || !authHeader.startsWith('Bearer ')) 
        throw new Errors.unAuthenticatedError ('Authorization is invaild1') ;
    
    const token = authHeader.split(' ')[1] ; 

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET) ;
        // const user = User.findById(payload.id).select('-password') ; 
        // req.user = user ; 
        req.user = {userId : payload.userId , name : payload.name} ;  
        next() ; 
    }catch(err) {
        throw new Errors.unAuthenticatedError('Authorization is invaild')  ;
    }
}


export default authMiddleware ; 
