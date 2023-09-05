const User = require("../model/user");
const Receipe = require("../model/receipe");

async function rateUser(rid, newRating) {
  const receipe = await Receipe.findOne({ rid });

  await receipe.updateRating(newRating);
}

const userrate = async (req, res) => {
  try {
    const { uid, rid, newRating } = req.body;
    if (!uid) res.status(401).send("No user found");
    if (!rid) res.status(401).send("No Receipe found");
    if (newRating > 5 || newRating <1) res.status(401).send("only 1-5");
    await rateUser(rid, newRating);
    res.status(200).json({
      success: true,
      message: "Successfully Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Contact",
    });
  }
};

module.exports = userrate;
