const mongoose=require("mongoose")
const crypto = require("crypto");
const{generateSimpleToken}=require("../utils/Token")
const UserCredentialSchema=new mongoose.Schema({
       
    token_user_credential:{
        type:String,
        default:null

    },
    token_user:{
        type:String,
        default:null
    },
    password:{
        type:String,
        default:null
    }
},{timestamps:true})


UserCredentialSchema.pre("save", function (next) {
    if (!this.token_user_credential) {
      this.token_user_credential =generateSimpleToken()
    }
    next();
  });

module.exports=mongoose.model("UserCredential",UserCredentialSchema)