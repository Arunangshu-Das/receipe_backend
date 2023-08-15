const User = require("../model/user");
const Receipe = require("../model/receipe");

const adddislike = async (req, res) => {
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

    if (user.dislikedRecipes.includes(rid)) {
      return res
        .status(400)
        .json({ message: "User already disliked this recipe" });
    }

    if (user.likedRecipes.includes(rid)) {
      // Remove dislike
      user.likedRecipes.pull(rid);
      recipe.likedBy.pull(uid);
      recipe.likes -= 1;
    }

    // Update the recipe's like count and user's likedRecipes array
    recipe.dislikes += 1;
    recipe.dislikedBy.push(uid);
    user.dislikedRecipes.push(rid);

    await Promise.all([recipe.save(), user.save()]);

    res.status(200).json({ message: "Dislike added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports=adddislike;