const User = require("../model/user");
const Receipe = require("../model/receipe");

const addlike = async (req, res) => {
  try {
    const { rid, uid } = req.body;

    // Retrieve the recipe
    const recipe = await Receipe.findOne({ rid });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if the user already liked the recipe
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.likedRecipes.includes(rid)) {
      return res
        .status(400)
        .json({ message: "User already liked this recipe" });
    }

    if (user.dislikedRecipes.includes(rid)) {
      // Remove dislike
      user.dislikedRecipes.pull(rid);
      recipe.dislikedBy.pull(uid);
      recipe.dislikes -= 1;
    }

    // Update the recipe's like count and user's likedRecipes array
    recipe.likes += 1;
    recipe.likedBy.push(uid);
    user.likedRecipes.push(rid);

    await Promise.all([recipe.save(), user.save()]);

    res.status(200).json({ message: "Like added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports=addlike;