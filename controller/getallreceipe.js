const Receipe = require("../model/receipe"); 

const getAllMedicine= async (req, res) => {
    try {
      const rec = await Receipe.find({});
      res.status(200).send({
        success: true,
        data: rec,
      });
    } catch (error) {
      console.log(error);
    }
};

module.exports = getAllMedicine;