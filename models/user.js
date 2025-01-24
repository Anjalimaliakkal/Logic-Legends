const mongoose=require("mongoose")
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cupsSaved: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
  });
const userModel=mongoose.model("userdata",userSchema)
module.exports=userModel
