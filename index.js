const express=require('express')
const app=express();
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const mongoose=require('mongoose');
const { urlencoded } = require('body-parser');
const {User}=require('./model/user')
const config=require('./config/key')
mongoose.connect(config.mongoURI,
{useNewUrlParser:true,useUnifiedTopology: true}).then(()=>console.log('MovieBase connected!!'))
.catch(err=>console.log(err))

app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())

app.get('/',(req,res)=>{
res.json({"hi":"hello bitches"})
})
app.post('/api/users/register',(req,res)=>{
    const user=new User(req.body)
    user.save((err,userData)=>{
        if(err)return res.json({success:false,err})
        return res.status(200).json({success:true,userData})
    })
  
})

app.listen(3000)