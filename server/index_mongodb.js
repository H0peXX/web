const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UserModel = require("./models/user")



const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://admin:admin@cluster0.gi1opmb.mongodb.net/project");

app.post('/login',(req,res)=>{
    const{username,password} = req.body;
    UserModel.findOne({username:username})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
                
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No record")
        }
    })
})


app.post('/register',(req, res)=> {
    
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})



app.listen(3001, ()=>{
    console.log("server is fine")
})