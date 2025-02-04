const mongoose=require("mongoose")
const crypto = require("crypto");
const UserSchema=new mongoose.Schema({

    token_user:{
        type:String,
        default:null
    },
    username:{
        type:String,
        default:null,
        required:true
    },
    email:{
        type:String,
        default:null,
        required:true
    },
    mobile:{
        type:Number,
        default:null,
        required:true
    },


},{timestamps:true})

UserSchema.pre("save", function (next) {
    if (!this.token_user) {
      this.token_user = crypto.randomBytes(6).toString("hex"); 
    }
    next();
  });

module.exports=mongoose.model("User",UserSchema)