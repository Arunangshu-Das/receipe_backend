const User = require("../model/user");
const Receipe = require("../model/receipe");

const getreceipe=async (req, res) => {
  try {
    // const recipeId = req.params.recipeId;
    const { rid, uid } = req.body;

    // Retrieve the recipe
    const recipe = await Receipe.findOne({ rid });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if the user liked or disliked the recipe
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const liked = user.likedRecipes.includes(rid);
    const disliked = user.dislikedRecipes.includes(rid);

    res.status(200).json({
      recipe,
      like: liked,
      dislike: disliked,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getreceipe;