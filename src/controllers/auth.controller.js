import Errors from "../errors/index.js";
import asyncWrapper from "../middleware/asyncWrapper.js" ;
import User from "../models/user.module.js" ; 
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv" ; 
dotenv.config({path : '../../.env'}) ; 
console.log(process.env.JWT_SECRET , process.env.EXPIREIN) ; 

const signup = asyncWrapper(async(req , res) => {
    const {name , email , password} = req.body ; 
    
    if (!name || !email || !password)   
        throw new Errors.BadRequestError('invailed input please enter name , email , password') ; 

    const newUser = await User.create(req.body) ; 
    
    const token = newUser.createJWT(process.env.JWT_SECRET , process.env.EXPIREIN) ; 

    res.status(StatusCodes.CREATED).json({ user : {newUser}, token}) ; 
}) ; 

const login = asyncWrapper(async(req , res) => {
    const {email , password} = req.body ; 
    
    if (!email || !password) 
        throw new Errors.BadRequestError('Please enter email and passord') ; 

    const user = await User.findOne({email : email}) ; 
    
    if (!user) 
        throw new Errors.unAuthenticatedError('invaild User') ; 

    const isCorrectPassword = await user.comparePassword(password) ; 
    if(!isCorrectPassword) 
        throw new Errors.unAuthenticatedError('password is not match') ; 
    const token = user.createJWT(process.env.JWT_SECRET , process.env.EXPIREIN) ; 

    res.status(StatusCodes.OK).json({token}) ; 
}) ; 


export default {
    signup , 
    login 
} ; 