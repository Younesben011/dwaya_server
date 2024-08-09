import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import path from "path"
import { fileURLToPath } from "url"
import multer from "multer"
import authRouter from "./routes/auth.js"
import postRouter from "./routes/post.js"
import uploadRouter from "./routes/upload.js"
import { isAuthenticated } from "./middlewares/authMiddleware.js"
import { getImage } from "./controllers/images.js"
dotenv.config()
// sads

// define constant
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const Port = process.env.PORT || 6001
const Host = process.env.HOST




const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use("/assets",express.static(path.join(__dirname,"/public/assets")))




//routes
app.get("/",(req,res)=>{
    res.send({message:"hi welcome "})
})
app.use("/auth", authRouter)
app.use("/posts",isAuthenticated,postRouter)
app.use("/upload", isAuthenticated, uploadRouter);
app.get("/pictures/:folder/:path", isAuthenticated, getImage);
// mongodb connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    
    app.listen(Port, Host, (err) => {
      if (err) {
        console.log(`connection error`)
        return
      }
      console.log(`connected at ${Host}:${Port} \n db connection -> connected`)
    })
  })
  .catch((err) => {
    console.log(`database connection error ${err}`)
  })