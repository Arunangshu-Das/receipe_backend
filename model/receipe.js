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
});

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
