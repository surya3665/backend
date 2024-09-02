const bcrypt = require("bcrypt")
const User = require("../../models/user.model")
const jwt = require("jsonwebtoken")


const test = (req, res) => {
    res.send("working")
}
const signupController = async(req,res) => {
    try{
        const {userName,email,password} = req.body
        if((!userName,!email,!password)){
            return res.json({msg:"please enter all details",success:false})
        }
        if(password.length < 8 ){
            return res.json({
                msg:"please enter atleast 8 char",
                success:false,
            })
        }
        const hassedPassword = bcrypt.hashSync(password,8);
        const newUser=await User.create({
            userName:userName,
            email:email,
            password:hassedPassword,
        })

        const token= jwt.sign({userId: newUser._Id},process.env.JWT_SECRET)

        return res
            .cookie("Access_token",token)
            .status(200)
            .json({newUser , msg:"Account created seccessfully",success:true})
    }catch (err) {
        return res.json({success:false,msg:err.msg})
    }
}
const loginController = async (req,res) => {
    try{
        const {email,password}= req.body
        if(!email,!password) {
            return res 
            .status(404)
            .json ({msg:"invalid" , success:false})
        }
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({msg: "user not found",success:false})
        }

        const passwordVerified = bcrypt.compareSync(password, user.password)
        if (!passwordVerified) {
            return res
            .status (401)
            .json({msg:"invalid",success:false})
        }
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)
    return res
    .cookie("Access_token",token)
    .status(200)
    .json({msg:"login successfull",user,success:true})
    }catch(err) {
        return res.cookie(500).json({msg:err.message})
    }
}
const logoutController = async (req,res) => {
    try{
        res
        .clearCookie("Access_token")
        .status(200)
        .json({msg:"logged out successfully", success:true})
    }catch(err){
        return res.json({success:false, msg:err.message})
    }
}

module.exports = {
    test,
    signupController,
    loginController,
    logoutController
}