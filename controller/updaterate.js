const User = require("../model/user");

async function rateUser(uid, newRating) {
  const user = await User.findOne({ uid });

  await user.updateRating(newRating);
}

const userrate = async (req, res) => {
  try {
    const { uid, newRating } = req.body;
    if (!uid) res.status(401).send("No user found");
    if (newRating > 5) res.status(401).send("only 1-5");
    await rateUser(uid, newRating);
    res.status(200).json({
      success: true,
      message: "Successfully Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Contact owner",
    });
  }
};

module.exports = userrate;