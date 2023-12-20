const orderController = require("../controllers/Order");
const express = require("express");
const router = express.Router();

//Product routes
router.get("/order", orderController.findAllOrders);
router.get("/order/:id", orderController.findById);
router.post("/order", orderController.addOrder);
router.delete("/order/:id", orderController.deleteOrder);

module.exports = router;
