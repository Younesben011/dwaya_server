import mongoose, { Schema } from "mongoose"
import mongodb, { ObjectId } from "mongodb"
import Category from "./Category.js"


const PostSchema = new mongoose.Schema({
    owner:{
        type:ObjectId,
        ref:"Pharmacy",
        require:[true, "owner not found"],
    },
    medicine:{
        type:String,
        require:true,
    },
    discretion:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
    },
    // category:{
    //     type:ObjectId,
    //     ref:"Category"
    // },
    images:{
        type: [String],
        default: [],
    }
},{timestamps:true})

const Post = new mongoose.model("Post",PostSchema)
export default Post