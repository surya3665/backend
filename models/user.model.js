const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
});
const UserModel= new mongoose.model("users",UserSchema)

module.exports=UserModel