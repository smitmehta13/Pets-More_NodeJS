const cartController = require("../controllers/Cart");
const express = require("express");
const router = express.Router();

//Cart
router.get("/cart", cartController.findAllUsers);
router.get("/cart/:id", cartController.findCartById);

module.exports = router;
