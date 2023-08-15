const bcrypt = require("bcryptjs");
const User = require("../model/user");

const changepassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(401).send("All fields are mandetory");
    }
    const extUser = await User.findOne({ email });
    extUser.password = await bcrypt.hash(password, Number(process.env.HASH));
    await extUser.save();
    res.status(200).json({
      success: true,
      message: "Password successfully changed",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
