const { Password } = require("@mui/icons-material");
const { access } = require("fs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNO: { type: String, required: true },
  githubusername: { type: String, required: true },
  rollNO:{type:String,required:true},
  collegeName: { type: String, required: true },
  accessCode: { type: String, required: true },
  Password:{type:String}
});
 const User = mongoose.model("users", userSchema);
module.exports = User;
