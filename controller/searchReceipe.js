const Receipe = require("../model/receipe");

const searchreceipe = async (req, res) => {
  try {
    const { receipe } = req.body;

    const recipe = await Receipe.find({
      name: { $regex: receipe, $options: "i" },
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({
      Recipe: recipe,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = searchreceipe;
