const jwt = require("jsonwebtoken")

const User = require("../models/user.model")

const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.Access_token
        if(!token){
            return res.status(401).json({success:false,msg:"unauthorized"})
        }
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        if(!decodedToken){
            return res.status(404).json({success:false,msg:"unauthorized"})
        }
        const user = await User.findById(decodedToken.userId)
        if(!user){
            return res.status(404).json({success:false,msg:"user not found"})
        }
        req.user=user
        next()
    }catch(err){
        console.log("error for protect.middleware",err.message)
        return res.json({success:false,message:"internal err"})
    }
}
module.exports=protectRoute