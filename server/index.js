const express=require('express')
const app=express();
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const mongoose=require('mongoose');
const { urlencoded } = require('body-parser');
const {User}=require('./model/user')
const {auth}=require('./middelware/auth')
const config=require('./config/key')
mongoose.connect(config.mongoURI,
{useNewUrlParser:true,useUnifiedTopology: true}).then(()=>console.log('MovieBase connected!!'))
.catch(err=>console.log(err))

app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.get('/api/users/auth',auth,(req,res)=>{
res.status(200).json({
    _id:req._id,
    isAuth:true,
    email:req.user.email,
    name:req.user.name,
    lastname:req.user.lastname,
    role:req.user.role
})
})
app.post('/api/users/login',(req,res)=>{
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            return res.json({
                success:false,
                message:"Auth failed, email not found!!"
            })
                    }
            user.comparePassword(req.body.password,(err,isMatch)=>{
                if(err)return res.json({loginSuccess:false,error:"error"})
               if(!isMatch){
                    return res.json({loginSuccess:false,message:"Invalid Password"})
                }
            })

            user.generateToken((err,user)=>{
                if(err)return res.status(400).send(err)
                res.cookie("x_auth",user.token).status(200).json({loginSuccess:true})
            })
        
    })
})
app.post('/api/users/register',(req,res)=>{
    const user=new User(req.body)
    user.save((err,userData)=>{
        if(err)return res.json({success:false,err})
        return res.status(200).json({success:true,userData})
    })
  
})
app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate({_id:req.user._id},{token:""},(err,doc)=>{
        if(err) return res.json({success:false,err})
        return res.status(200).send({success:true})
    })
})
const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Server is up and running on port ${port}`)
})