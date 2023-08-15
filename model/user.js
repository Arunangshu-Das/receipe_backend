const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    default: null,
  },
  lastname: {
    type: String,
    default: null,
  },
  email: {
    type: String,
  },
  phoneno: {
    type: String,
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  password: {
    type: String,
  },
  dob: {
    type: String,
    default: null,
  },
  star: {
    type: Number,
    default: 3,
  },
  nor: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
  likedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Receipe" }],
  dislikedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Receipe" }],
});

userSchema.methods.updateRating = async function (newRating) {
  const oldRatingSum = this.star * this.nor;
  this.nor += 1;
  this.star = (oldRatingSum + newRating) / this.nor;
  await this.save();
};

// Method to handle liking a recipe
userSchema.methods.likeRecipe = async function (recipeId) {
    if (!this.likedRecipes.includes(recipeId)) {
        this.likedRecipes.push(recipeId);
        await this.save();
    }
};

// Method to handle disliking a recipe
userSchema.methods.dislikeRecipe = async function (recipeId) {
    if (!this.dislikedRecipes.includes(recipeId)) {
        this.dislikedRecipes.push(recipeId);
        await this.save();
    }
};

module.exports = mongoose.model("user", userSchema);
