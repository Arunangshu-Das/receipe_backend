const User = require("../model/user");
const bcrypt = require("bcryptjs");
const updateuser=async (req, res) => {
  try {
    const { firstname, lastname, email, phoneno, password,newpass, dob } = req.body;

    if (!(firstname && lastname && email && password)) {
      res.status(401).send("All fields are mandetory");
    }

    const extUser = await User.findOne({ email });
    if (!extUser) res.status(401).send("User not found");
    if (!bcrypt.compare(password, extUser.password))
      res.status(401).send("Password not found");
    extUser.firstname = firstname;
    extUser.lastname = lastname;
    if(newpass) extUser.password = await bcrypt.hash(newpass, Number(process.env.HASH));
    if (phoneno) extUser.phoneno = phoneno;
    if (dob) extUser.dob = dob;
    await extUser.save();
    res.status(200).json({
      success: true,
      message: "Successfully Added/Changed",
    });
  } catch (error) {
    console.log(error);
    console.log("Error !!");
    res.status(500).json({
      success: false,
      message: "Contact owner",
    });
  }
};

module.exports = updateuser;