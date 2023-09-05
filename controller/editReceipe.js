const Recipe = require("../model/receipe");
const updaterecipe = async (req, res) => {
  try {
    const { name, desc, videolink, imagelink, taste, rid } =
      req.body;

    if (!(rid)) {
      res.status(401).send("rid mandetory");
    }

    const extReceipe = await Recipe.findOne({ rid });
    if (!extReceipe) res.status(401).send("User not found");
    extReceipe.name = name;
    if (desc) extReceipe.desc = desc;
    if (videolink) extReceipe.videolink = videolink;
    if (imagelink) extReceipe.imagelink = imagelink;
    if (taste) extReceipe.taste = taste;
    await extReceipe.save();
    res.status(200).json({
      success: true,
      message: "Successfully Added/Changed",
    });
  } catch (error) {
    console.log(error);
    console.log("Error !!");
    res.status(500).json({
      success: false,
      message: "Contact owner",
    });
  }
};

module.exports = updaterecipe;
