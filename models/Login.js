
import mongoose, { Schema } from "mongoose"
import mongodb, { ObjectId } from "mongodb"

import isEmail from "validator/lib/isEmail.js"




const LoginSchema = new mongoose.Schema({
    password: {
        type: String,
        required: [true, "pleas Enter a password"],
        minlength: [8, "minimum password length is 8"],
      },
      email: {
        type: String,
        required: [true, "pleas Enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail],
      },
      LoginType:{
        type:String,
        require:true,
        default:"pharmacy",
        enum:["admin","pharmacy"]
      }

})


const Login = new mongoose.model("Login", LoginSchema)
export default Login 
