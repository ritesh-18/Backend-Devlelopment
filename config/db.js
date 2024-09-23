const mongoose= require("mongoose")
 const Database=()=>{
    mongoose.connect("mongodb://localhost:27017/paytm").then(()=>{
        console.log("connected to database")
    }).catch((err)=>{
        console.log(err)
    })
 }
 module.exports={
    Database
 }