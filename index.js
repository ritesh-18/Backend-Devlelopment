const express = require("express")
const app=express()
const cors=require("cors")
app.use(cors())
const {Database}=require("./config/db")
const router = require("./routes/routess")



//middle ware 
app.use(express.json())
app.use("/api/v1/" , router)
// app.use("api/v1" , accountRoute)









app.get("/",(req,res)=>{
    
    res.send("Default routes")
})

Database() // database connection done

app.listen(4000 , ()=>{
    console.log("server is up and running at port no 4000")
})  