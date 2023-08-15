const User = require("../model/user");
const showuser = async (req, res) => {
  try {
    const { uid } = req.body;
    if (!uid) {
      res.status(401).send("Not a user");
    }
    const extUser = await User.findOne({ uid });
    if (!extUser) res.status(401).send("User not found");
    extUser.password = undefined;
    res.status(200).json({
      user:extUser,
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
module.exports=showuser;