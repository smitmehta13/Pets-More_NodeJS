const cartController = require("../controllers/Cart");
const express = require("express");
const router = express.Router();

//Cart
router.get("/cart", cartController.findAllUsers);

module.exports = router;
