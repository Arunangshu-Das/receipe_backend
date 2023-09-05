const User = require("../model/user");
const Receipe = require("../model/receipe");

const getreceipe = async (req, res) => {
  try {
    // const recipeId = req.params.recipeId;
    const { rname } = req.body;

    // Retrieve the recipe
    const recipe = await Receipe.find({
      name: { $regex: rname, $options: "i" },
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({
      Recipe:recipe
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getreceipe;
