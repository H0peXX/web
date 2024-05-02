const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    address: String,
    phone: String,
    username: String,
    password:String
})

const UserModel = mongoose.model("user",UserSchema)
module.exports = UserModel