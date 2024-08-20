import Pharmacy from "../models/Pharmacy.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// register
import path from "path"
import { fileURLToPath } from "url"
import isEmail from "validator/lib/isEmail.js"
import Login from "../models/Login.js"

const errorHandller = (err) => {
  console.log(err)
}

export const register = async (req, res) => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.resolve(path.dirname(__filename), "..")
  const IMAGE_FOLDER = path.join(__dirname, "assets/images")

  try {
    const {
      password,
      email,
      name,
      phoneNumber,
      pharmaPicture,
      address,
      lng,
      lat,
      certificates
    } = req.body
    console.log("🚀 ~ register ~ body:", req.body)

    const imagePath = `http://${process.env.HOST}:${process.env.PORT}/pictures/${pharmaPicture}`
    if(!password||!email||!name||!address||!lng||!lat){
        res.status(505).json({message:"no data"})
        return
    }
    console.log("🚀 ~ register ~ imagePath:", imagePath)
    const salt = await bcrypt.genSalt()
    console.log(req.body)
    const passwordHash = await bcrypt.hash(password, salt)
    const newLogin = new Login({email,password: passwordHash,})
    const savedLogin = await newLogin.save()
    const newPharma = new Pharmacy({
      name,
      email,
      phoneNumber,
      pharmaPicture: imagePath,
      address,
      lng,
      lat,
    })
    const savedPharma = await newPharma.save()
    res.status(201).json({
      status: 201,
      user: savedPharma,
    }) /* status 201 in case that somthing is created 👌 */
  } catch (err) {
    errorHandller(err)

    res.status(500).json({status:500,err:err.message})
    return
  }
}

// LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body

    if (!email) {
      console.log("no email")
      res.status(400).json({ msg: " email  is required" })
      return
    }

    const pharma = await Login.findOne({ email: email } )
    if (!pharma) {
      console.log("pharma does not exist")
      res.status(400).json({ msg: "pharma does not exist. " })
      return
    }

    const isMatch = await bcrypt.compare(password, pharma.password)

    if (!isMatch) {
      console.log("Wrong email or  password.")
      res.status(400).json({ msg: "Wrong email or  password. " })
      return
    }
    const token = jwt.sign(
      { id: pharma.id, role: pharma.farmaType },
      process.env.JWt_SECRET
    )
    pharma.password = ""
    console.log(token)
    res.status(200).json({
      status: 200,
      token: token,
      pharma_id: pharma._id,
      pharmaType: pharma.farmaType,
    })
}
