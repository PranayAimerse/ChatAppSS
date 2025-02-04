const mongoose=require("mongoose")
require('dotenv').config()
exports. Dbconnect=()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('database connection successfull')
    }).catch((err)=>{
        console.log(err)
            console.log("database connection error occurs")
    })
}