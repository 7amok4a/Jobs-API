import asyncWrapper from "../middleware/asyncWrapper.js";


const getAllJobs = asyncWrapper(async(req , res) => {

}) ; 

const  getJob = asyncWrapper(async(req , res) => {

})
const  createJob = asyncWrapper(async(req , res) => {

})

const updateJob = asyncWrapper(async(req , res) => {

})

const deleteJob = asyncWrapper(async(req , res) => {

})





export default {
    getAllJobs , 
    getJob  , 
    createJob , 
    updateJob , 
    deleteJob 
}