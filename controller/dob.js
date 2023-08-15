const User = require("../model/user");
const dob = async (req, res) => {
  try {
    const { email, dob } = req.body;
    if (!(email && dob)) {
      res.status(401).send("All fields are mandetory");
    }
    const extUser = await User.findOne({ email });
    extUser.dob = dob;
    await extUser.save();
    res.status(200).json({
      success: true,
      message: "DOB successfully Added/Changed",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
