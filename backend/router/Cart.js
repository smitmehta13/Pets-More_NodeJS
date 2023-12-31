const cartController = require("../controllers/Cart");
const express = require("express");
const router = express.Router();

//Cart
router.get("/cart", cartController.findAllUsers);
router.get("/cart/:id", cartController.findCartById);
router.post("/cart", cartController.createCart);
router.put("/cart/:id", cartController.updateCart);
router.delete("/cart/:id", cartController.deleteCart);

module.exports = router;
