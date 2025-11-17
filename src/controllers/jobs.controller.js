import asyncWrapper from "../middleware/asyncWrapper.js";
import { StatusCodes } from "http-status-codes";
import Errors from "../errors/index.js" ; 
import Job from "../models/jobs.module.js";

const  createJob = asyncWrapper(async(req , res) => {
    req.body.createdBy = req.user.userId ; 
    const job = await Job.create(req.body) ;
    res.status(StatusCodes.CREATED).json({job}) ;  
})

const getAllJobs = asyncWrapper(async(req , res) => {
    const jobs = await Job.find({createdBy : req.user.userId}).sort('createdAt') ; 
    res.status(StatusCodes.OK).json({jobs , count : jobs.length}) ; 
}) ; 

const  getJob = asyncWrapper(async(req , res) => {
    const {user : {userId} , params : {id : jobId}} = req ; 
    const job = await Job.findOne({_id : jobId , createdBy : userId}) ; 

    if(!job) 
        throw new Errors.NotFoundError(`No job with id ${jobId}`) ; 

    res.status(StatusCodes.OK).json({job}) ; 
})


const updateJob = asyncWrapper(async(req , res) => {
    const { body : {company , position} , user : {userId} , params : {id : jobId}} = req ; 


    if (company === '' || position === '') 
        throw new Errors.BadRequestError('Company or Position fields cannot be empty') ; 

    const job  = await Job.findByIdAndUpdate({_id : jobId , createdBy :userId}, req.body , 
        {new : true , runValidators : true , overwrite : true }) ; 

    if(!job) 
        throw new Errors.NotFoundError(`No job with id ${jobId}`) ; 

    res.status(StatusCodes.OK).json({job}) ; 
})

const deleteJob = asyncWrapper(async(req , res) => {
    const {user : {userId} , params : {id : jobId}} = req ; 
    const job = await Job.findByIdAndDelete({_id : jobId , createdBy : userId}) ; 
    if(!job) 
        throw new Errors.NotFoundError(`No job with id ${jobId}`) ; 

    res.status(StatusCodes.OK).json({message : "job is deleted"})  ; 
})





export default {
    getAllJobs , 
    getJob  , 
    createJob , 
    updateJob , 
    deleteJob 
}