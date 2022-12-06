const mongoose = require("mongoose");
const Order = require("../models/Order");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

//Find all
const findAllOrders = asyncHandler(async (req, res) => {
  Order.find({}, (err, orders) => {
    err && res.status(500).send({ message: `Error: ${err}` });
    !orders && res.status(404).send({ message: "No orders found" });
    res.status(200).json(orders);
  });
});

//Delete
const deleteOrder = asyncHandler(async (req, res) => {
  // #swagger.tags = ["Order"];
  // #swagger.description = "Endpoint to delete an order by id.";
  /* #swagger.parameters['id'] = {
                    in: 'path',
                    description: 'Order id.',
                    required: true,
                    type: 'integer'
            } */
  Order.findByIdAndDelete(req.params.id, (err, order) => {
    /* #swagger.responses[200] = {
                    schema: { $ref: "#/definitions/order" },
                    description: "Order deleted."
            } */
    /* #swagger.responses[404] = {
                    schema: { $ref: "#/definitions/order" },
                    description: "Order not found."
            } */
    /* #swagger.responses[500] = {
                    schema: { $ref: "#/definitions/order" },
                    description: "Error."
            } */
    err &&
      res.status(500).send({ message: `Error deleting the order: ${err}` });
    !order && res.status(404).send({ message: "order not found" });
    order && !err && res.status(204).send({ message: `order deleted` });
  });
});

//findById
const findById = (req, res) => {
  // #swagger.tags = ["Order"];
  // #swagger.description = "Endpoint to find an order by id.";
  /* #swagger.parameters['id'] = {
                    in: 'path',
                    description: 'Order id.',
                    required: true,
                    type: 'integer'
            } */
  Order.findById(req.params.id, (err, order) => {
    /* #swagger.responses[200] = {
                    schema: { $ref: "#/definitions/order" },
                    description: "Order found."
            } */
    /* #swagger.responses[404] = {
                    schema: { $ref: "#/definitions/order" },
                    description: "Order not found."
            } */
    /* #swagger.responses[500] = {
                    schema: { $ref: "#/definitions/order" },
                    description: "Internal server error."
            } */
    err && res.status(500).send({ message: `Error: ${err}` });
    !order && res.status(404).send({ message: "Order not found" });
    !err && order && res.status(200).json(order);
  });
};

//Create a new order
const addOrder = (req, res) => {
  // #swagger.tags = ["Order"];
  // #swagger.description = "Endpoint to create a order."
  /* #swagger.parameters['newOrder'] = {
                in: 'body',
                description: 'Order information',
                required: true,
                schema: { $ref: "#/definitions/newOrder" },
                type: 'object'
        } */
  // find user
  User.findOne({ id: req.body.userId }, (err, user) => {
    /* #swagger.responses[500] = {
                    description: 'Error',
                    schema: { $ref: "#/definitions/Error" }
            } */
    err && res.status(500).send({ message: `Error finding user: ${err}` });
    /* #swagger.responses[404] = {
                    description: 'User not found',
                    schema: { $ref: "#/definitions/User" }
            } */
    !user && res.status(404).send({ message: "User not found" });
    if (user) {
      const order = new Order({
        user: user._id,
        products: req.body.productIds,
        orderDate: Date.now(),
        shippingAddress: user.shippingAddress,
      });

      order.save((err, order) => {
        err &&
          res.status(500).send({ message: `Error creating order: ${err}` });
        /* #swagger.responses[200] = {
                    description: 'Order created',
                    schema: { $ref: "#/definitions/Order" }
            } */
        !err && res.status(200).json(order);
      });
    }
  });
};

module.exports = {
  findAllOrders,
  findById,
  addOrder,
  deleteOrder,
};
