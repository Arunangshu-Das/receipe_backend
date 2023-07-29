const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    default: null,
  },
  lastname: {
    type: String,
    default: null,
  },
  email: {
    type: String,
  },
  phoneno: {
    type: String,
  },
  uid: {
    type: String,
    default: null,
  },
  password: {
    type: String,
  },
  dob: {
    type: String,
    default: null,
  },
  star:{
    type: Number,
    default:3
  },
  nor:{
    type:Number,
    default:0
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
