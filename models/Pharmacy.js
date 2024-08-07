
import mongoose, { Schema } from "mongoose"
import mongodb, { ObjectId } from "mongodb"
import isEmail from "validator/lib/isEmail.js"


const PhoneNumber = new mongoose.Schema({
  mobile: Number,
  local: Number,

})

const PharmacySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "pleas Enter a pharmacy name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "pleas Enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail],
  },
  phoneNumber: {
    type: PhoneNumber,
  },
  pharmaPicture: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  address: {
    type: String,
  },
  lng: {
    type: Number,
  },
  lat: {
    type: Number,
  },
  acountstate: {
    type: String,
    default: "Active",
  },
  pharmaType: {
    type: String,
    default: "normal",
    enum:["normal","verified"]
  },
  certificates: {
    type: [String],
    default: [],
  },
})

const Pharmacy = new mongoose.model("Pharmacy", PharmacySchema)
export default Pharmacy 
