const Receipe = require("../model/receipe");
const mongoose = require("mongoose");

const newreceipe=async (req, res) => {
  const { name, desc, username, postedon, videolink, imagelink, taste } =
    req.body;

  if (!(name, username, postedon, taste))
    res.status(401).send("name, username, postedon,taste fields are mandetory");

  const rid = new mongoose.Types.ObjectId();
  const receipe = await Receipe.create({
    name: name,
    desc: desc,
    username: username,
    postedon: postedon,
    videolink: videolink,
    imagelink: imagelink,
    taste: taste,
    rid: rid,
  });
  res.status(200).json({
    success: true,
    receipe,
  });
};

module.exports=newreceipe;