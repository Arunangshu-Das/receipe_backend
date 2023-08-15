require("./config/database").connect();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();
const uniqid = require("uniqid");
const User = require("./model/user");
const mongoose = require("mongoose");
const Receipe=require('./model/receipe');
const router=require('./router');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Receipe Sharing");
});

async function generateUniqueUsername(firstname,lastname) {
  let uid;
  let isUnique = false;

  while (!isUnique) {
    // Generate a random username
    uid = uniqid(firstname+'-', '-'+lastname);

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ uid });

    // If the username is not found in the database, mark it as unique
    if (!existingUser) {
      isUnique = true;
    }
  }

  return uid;
}
app.use("/", router);

app.listen(process.env.PORT, (err) => {
  console.log(err);
});