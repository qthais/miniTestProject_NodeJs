const mongoose=require('mongoose')
const Schema=mongoose.Schema
const User=new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    role: {
      type: String,
      default: "Basic",
      required: true,
    },
  })
const UserModel=mongoose.model('user',User)
module.exports=UserModel