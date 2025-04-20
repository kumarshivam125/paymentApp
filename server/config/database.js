const mongoose=require('mongoose');
require('dotenv').config();
const dbConnect=()=>{
    // mongoose.connect("mongodb://localhost:27017/mern1")
    // console.log("MONGO_DB_URL-->",process.env.MONGO_DB_URL);
    mongoose.connect(process.env.MONGO_DB_URL)
    .then(()=>console.log("DB Connection Done"))
    .catch((err)=>console.log("Error in DB Connection",err))
}
module.exports=dbConnect;
