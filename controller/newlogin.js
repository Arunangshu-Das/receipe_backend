const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const register = async (req, res) => {
  try {
    const { firstname, lastname, email, phoneno, password } = req.body;

    if (!(firstname && lastname && email && password)) {
      res.status(401).send("All fields are mandetory");
    }

    const extUser = await User.findOne({ email });

    if (extUser) {
      res.status(401).send("User already found");
    } else {
      // const uid = await generateUniqueUsername(firstname,lastname);
      const uid = new mongoose.Types.ObjectId();
      const encryptPassword = await bcrypt.hash(
        password,
        Number(process.env.HASH)
      );

      const user = await User.create({
        firstname,
        lastname,
        email,
        phoneno,
        uid,
        password: encryptPassword,
      });

      const token = jwt.sign(
        {
          id: user._id,
          email,
        },
        process.env.SIGNATURE,
        { expiresIn: "1h" }
      );

      user.token = token;

      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
      });
    }
  } catch (error) {
    console.log(error);
    console.log("Error !!");
    res.status(500).json({
      success: false,
      message: "Contact owner",
    });
  }
};

module.exports = register;
