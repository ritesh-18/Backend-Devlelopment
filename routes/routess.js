const express=require("express")

const router=express.Router()
const userRouter = require("./userRouter")
const accountRouter = require("./account")

router.use("/users" , userRouter)
router.use("/account" , accountRouter)

module.exports = router