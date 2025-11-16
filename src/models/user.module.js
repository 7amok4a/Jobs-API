import mongoose from "mongoose";
import bcrypt from "bcrypt" ; 
import jwt from "jsonwebtoken"; 

const UserSchema = mongoose.Schema({
    name : {
        type : String , 
        required : [true , 'Please enter name'] , 
        minlength : 3 , 
        maxlength : 50 , 
    } , 
    email : {
        type : String , 
        required : [true , 'Please enter password'] ,
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter email',
        ] , 
        unique : true , 
    } , 
    password :
    {
        type : String ,
        required : true , 
        minlength : 6 ,  
    }
})


UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10) ; 
    this.password = await bcrypt.hash(this.password , salt) ; 
});

UserSchema.methods.createJWT = function(JWT_SECRET , EXPIREIN){
    return  jwt.sign({userId : this._id , name : this.name} , 
            JWT_SECRET , {expiresIn : EXPIREIN} ) ;
}


UserSchema.methods.comparePassword = async function(postPassord) {
    const isMatch = await bcrypt.compare(postPassord , this.password) ; 
    return isMatch ;
}
const User = mongoose.model('users' , UserSchema) ; 

export default User ; 