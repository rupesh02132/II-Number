const express = require("express");
const userController = require("../controllerServices/user");
const router = express.Router();


router.get("/profile", userController.getUserProfile);
router.get("/", userController.getAllUser);

module.exports=router;