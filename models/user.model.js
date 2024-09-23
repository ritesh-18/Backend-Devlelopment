const mongoose = require("mongoose")
const userSchema=new mongoose.Schema({
  fname:{
    type:String,
    required:true
   
  },
  lname:{
    type:String,
    required:true
    
  },
  password:{
    type:String,
    required:true
   
  },
  username:{
     type:String,
     required:true
     
  }


},{timestamps:true})

const User=mongoose.model('users' , userSchema)


//creating acount schema
const accountSchema=new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  balance:{
    type:Number,
    required:true
  }
})
const Account=mongoose.model('account' , accountSchema)


module.exports={
  User,
  Account
}
