const mongoose=require("mongoose")
const crypto = require("crypto");

const UserLoginHistorySchema=new mongoose.Schema({
    
    token_user_login_history:{
        type:String,
        default:null
    },
    token_user:{
        type:String,
        default:null
    },
    time_login:{
        type:Date,
        default:Date.now()
       
    },
    time_logout:{
        type:Date,
        default:null
    },
    status: {
        type: String,
        enum: ['active', 'offline'],
        default: "offline"
      }


},{timestamps:true})


UserLoginHistorySchema.post("save",async function (data) {
    console.log("data printing tken login historyy",data)
    if (data.token_user_login_history===null) {
         data.token_user_login_history = crypto.randomBytes(6).toString("hex"); 
         await data.save()
    }

  });

module.exports=mongoose.model("UserLoginHistory",UserLoginHistorySchema)