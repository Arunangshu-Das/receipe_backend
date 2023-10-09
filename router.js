const express = require("express");
const getallreceipe = require("./controller/getallreceipe");
const adddislike = require("./controller/adddislike");
const addlike = require("./controller/addlike");
const getreceipe = require("./controller/getreceipe");
const newreceipe = require("./controller/newreceipe");
const userrate = require("./controller/updaterate");
const showuser = require("./controller/showuser");
const updateuser = require("./controller/update");
const login = require("./controller/login");
const register = require("./controller/newlogin");
const addreview = require("./controller/addreview");
const nooflikeanddislike = require("./controller/noOfLikeDislike");
const searchreceipe = require("./controller/searchReceipe");
const updateratereceipe = require("./controller/updateRateReceipe");
const editrecipe = require("./controller/editReceipe");
const router = express.Router();

router.put("/update", updateuser);
router.post("/login", login);
router.post("/register", register);
router.get("/showuser", showuser);
router.post("/updaterate", userrate);

router.post("/newreceipe", newreceipe);
router.get("/getreceipe", getreceipe);
router.get("/receipes", getallreceipe);
router.post("/addlike", addlike);
router.post("/adddislike", adddislike);
router.post("/editrecipe", editrecipe);
router.get("/nooflikeanddislike", nooflikeanddislike);
router.post("/searchreceipe", searchreceipe);
router.post("/updateratereceipe", updateratereceipe);
router.post("/addreview", addreview);

module.exports = router;
