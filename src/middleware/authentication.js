import jwt from "jsonwebtoken" ; 
import Errors from "../errors/index.js" ; 
import User from "../models/user.module.js";


const authMiddleware = (req , res , next)=> { 
    const authHeader = req.header.authorization ; 
    if (!authHeader || !authHeader.startsWith('Bearer ')) 
        throw new Errors.unAuthenticatedError ('Authorization is invaild') ;
    
    const token = authHeader.split(' ')[1] ; 

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET) ;
        const user = User.findById(payload.id).select('-password') ; 
        req.user = user ; 
        req.user = {userId : payload.userId , name : payload.name} ;  
    }catch(err) {
        throw new Errors.unAuthenticatedError('Authorization is invaild')  ;
    }
}


export default authMiddleware ; 
