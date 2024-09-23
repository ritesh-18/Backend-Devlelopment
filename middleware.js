const secretkey="ritesh"
const jwt=require("jsonwebtoken")

const middleware=(req, res , next)=>{
    const autHeader=req.headers.authorization;
    if(!autHeader){
        return res.status(403).json({
            msg:"Token not found",
        })
    }
    const token=autHeader.split(" ")[1];
    try {
        //verify your token with secret key?
        const decoded= jwt.verify(token ,secretkey);
        if(decoded.userId){
            req.userId=decoded.userId
            next()
        }else{
            res.send({
                msg:"Invalid token"
            })
        }
        
    } catch (error) {
        res.send({
            msg:"invalid token",
            error
        })
    }
}
module.exports=middleware