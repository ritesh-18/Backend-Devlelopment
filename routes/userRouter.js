const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt")
//importing model of user
const { User, Account } = require("../models/user.model");

const zod = require("zod");
const jwt = require("jsonwebtoken");

const signupSchema = zod.object({
  fname: zod.string(),
  lname: zod.string(),
  username: zod.string(),
  password: zod.string(),
});

userRouter.post("/signup", async (req, res) => {
  const {username , fname , lname , password} = req.body;
 
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res
      .status(411)
      .json({ message: "Invalid data", error: signupSchema.error });
  }
  
 
  const user = await User.findOne({
    username: req.body.username,
  });
  
  if (user) {
    return res
      .status(400)
      .json({ message: "User already present", error: "User already present" });
  }
  //  password hashing krte hai
  const salt=await bcrypt.genSalt(10)
  const hashedPassword=await bcrypt.hash(password , salt)
  
  User.create({
    fname,
    lname , 
    password :hashedPassword, 
    username
  })
    .then((data) => {
      //  token creation
      const token = jwt.sign(
        {
          userId: data._id,
        },
        "ritesh"   
      );
      
     //updating account db
    Account.create({
      userId:data._id,
      balance:1000 + Math.random()*100,
    })

    res.send({
        msg: "User created successfully",
        token: token,
        
      });
    })
    .catch((err) => {
      res.send({
        msg: "Error while creating user",
        err: err,
      });
    });
});






//validating input with zod
const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

userRouter.post("/login", async (req, res) => {
  const userData = req.body;
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      msg: "Input is invalid",
      error: signinBody.error,
    });
  }
  const user = await User.findOne({username:req.body.username})
  if(!user){
  res.send({
    msg:"User not found"
  })
  }
  const isValid=await bcrypt.compare(req.body.password , user.password)
    if(!isValid){
      res.send({
        msg:"Invalid password"
      })
    }
    
    const token=  jwt.sign(
      {
        userId: user._id,
      },
      "ritesh"   
    );
   res.status(200).send({
    msg:"User Logged In",
    token ,
    userData
   })


    
});









module.exports = userRouter;
