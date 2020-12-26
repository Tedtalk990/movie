const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,,
        unique:true
    },
    password:{
        type:String,
        minlength:5,
    },
    lastname:{
        type:string,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    token:{
        type:string
    },
    tokenExp:{
        type:Number
    }
})
const User=mongoose.model(User,userSchema)
module.exports={User}