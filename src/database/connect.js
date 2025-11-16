import mongoose from "mongoose";


const createConnectionDb = async(DB_URL)=> {
    await mongoose.connect(DB_URL).then((con)=> {
        console.log(`connection is succeful ${con.connection.host}`) ; 
    })
}


export default createConnectionDb ; 