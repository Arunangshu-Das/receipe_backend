const mongoose = require("mongoose");
const User = require("./user");

const receipeSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
    required: true,
  },
  desc: {
    type: String,
    default: null,
  },
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  postedon: {
    type: String,
    default: null,
  },
  videolink: {
    type: String,
    default: null,
  },
  imagelink: {
    type: String,
    default: null,
  },
  taste: {
    type: String,
    default: null,
  },
  rid: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  rating: {
    type: Number, 
    default: 3, 
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review", // Reference to the Review model
  }],
});

// Method to update the recipe's rating with a complex algorithm
receipeSchema.methods.updateRating = async function (newRating) {
  // Ensure the new rating is within the range of 0 to 5
  if (newRating >= 0 && newRating <= 5) {
    // Calculate a weighted average of the existing rating and the new rating
    // You can adjust the weights to customize the algorithm
    const currentRating = this.rating || 3; // Default to 3 if no previous rating exists
    const weightCurrent = 0.7; // Weight for the current rating
    const weightNew = 0.3; // Weight for the new rating

    // Calculate the updated rating
    this.rating = (currentRating * weightCurrent + newRating * weightNew) / (weightCurrent + weightNew);

    // Round the rating to two decimal places
    this.rating = Math.round(this.rating * 100) / 100;

    await this.save();
  } else {
    throw new Error("Rating must be between 1 and 5");
  }
};


// Method to handle liking a recipe
receipeSchema.methods.like = async function (userId) {
  if (!this.likedBy.includes(userId)) {
    this.likedBy.push(userId);
    this.likes += 1;

    if (this.dislikedBy.includes(userId)) {
      this.dislikedBy.pull(userId);
      this.dislikes -= 1;
    }

    await this.save();
  }
};

// Method to handle disliking a recipe
receipeSchema.methods.dislike = async function (userId) {
  if (!this.dislikedBy.includes(userId)) {
    this.dislikedBy.push(userId);
    this.dislikes += 1;

    if (this.likedBy.includes(userId)) {
      this.likedBy.pull(userId);
      this.likes -= 1;
    }

    await this.save();
  }
};

module.exports = mongoose.model("receipe", receipeSchema);
