import mongoose from "mongoose"

const JobSchema = mongoose.Schema({
    company : {
        type : String , 
        required : [true , 'Please  enter name company'] , 
        maxlength : 50 
    } , 
    position : {
        type : String , 
        required : [true , 'Please Enter your position']  , 
        maxlength : 100 , 
    } , 
    status : {
        type : String , 
        enum : ['interview' , 'declined' , 'pending'] , 
        default : 'pending' 
    } , 
    createdBy : {
        type : mongoose.Types.ObjectId , 
        ref : 'User' , 
        required : [true , 'Please Enter user!'] 
    }
} , {timestamps:true})



const Job = mongoose.model('jobs' , JobSchema) ; 


export default Job ;  
