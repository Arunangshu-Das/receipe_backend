const User = require("../model/user");
const phno = async (req, res) => {
  try {
    const { email, phoneno } = req.body;
    if (!(email && phoneno)) {
      res.status(401).send("All fields are mandetory");
    }
    const extUser = await User.findOne({ email });
    extUser.phoneno = phoneno;
    await extUser.save();
    res.status(200).json({
      success: true,
      message: "Phone number successfully changed/added",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
