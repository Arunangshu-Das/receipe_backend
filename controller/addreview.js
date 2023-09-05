const User = require("../model/user");
const Recipe = require("../model/receipe");
const Review = require("../model/review");
async function rateUser(rid, newRating) {
  const receipe = await Recipe.findOne({ rid });

  await receipe.updateRating(newRating);
}

async function addReviewToRecipe(req, res) {
  try {
    const { rid, uid, text, rating } = req.body;
    const recipe = await Recipe.findOne({ rid });
    const extUser = await User.findOne({ uid });
    if (!recipe || !extUser) {
      res
        .status(401)
        .send("name, username, postedon,taste fields are mandetory");

    }

    await rateUser(rid,rating);

    const review = new Review({
      user: uid,
      text
    });

    await review.save();

    recipe.reviews.push(review);
    await recipe.save();

    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    throw error;
  }
}

module.exports = addReviewToRecipe;
