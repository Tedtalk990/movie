const express=require('express')
const app=express();

const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://admin:nFwAJmpg6SiMguc@cluster0.oasyl.mongodb.net/moveiebase?retryWrites=true&w=majority',
{useNewUrlParser:true,useUnifiedTopology: true}).then(()=>console.log('MovieBase connected!!'))
.catch(err=>console.log(err))
app.listen(3000)