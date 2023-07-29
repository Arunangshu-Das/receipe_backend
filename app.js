require("./config/database").connect();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();
const uniqid = require("uniqid");
const User = require("./model/user");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, phoneno, password } = req.body;

    if (!(firstname && lastname && email && password)) {
      res.status(401).send("All fields are mandetory");
    }

    const extUser =await User.findOne({ email });

    if (extUser) {
      res.status(401).send("User already found");
    }
    else{
      const uid = await generateUniqueUsername(firstname,lastname);

      const encryptPassword = await bcrypt.hash(password, Number(process.env.HASH));

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
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(401).send("email and password is required");
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id, email }, "Minor", {
        expiresIn: "1h",
      });

      user.password = undefined;
      user.token = token;

      const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
      });
    } else {
      res.status(401).send("email or password is incorrect");
    }
  } catch (error) {
    res.status(401).send("email or password is incorrect");
    console.log(error);
  }
});




app.listen(process.env.PORT, (err) => {
  console.log(err);
});