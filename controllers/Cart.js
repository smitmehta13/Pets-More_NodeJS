const Cart = require("../models/Cart");
const User = require("../models/User");

// Display list of all carts.
const findAllUsers = (req, res) => {
  // #swagger.tags = ["Cart"];
  // #swagger.description = "Endpoint to get all carts.";
  Cart.find({}, (err, carts) => {
    err && res.status(500).send({ message: `Error: ${err}` });
    !carts && res.status(404).send({ message: "No carts found" });
    /* #swagger.responses[200] = {
                schema: { $ref: "#/definitions/carts" },
                description: "Carts found."
        } */
    res.status(200).json(carts);
  })
    .populate("user")
    .populate("products");
};

// Return a cart by user id.
const findCartById = (req, res) => {
  // #swagger.tags = ["Cart"];
  // #swagger.description = "Endpoint to get a cart by user id.";
  /* #swagger.parameters['id'] = {
                in: 'path',
                description: 'User id.',
                required: true,
                type: 'integer'
        } */
  // find user
  User.findOne({ id: req.params.id }, (err, user) => {
    err && res.status(500).send({ message: `Error: ${err}` });
    !user && res.status(404).send({ message: "No user found" });
    /* #swagger.responses[200] = {
                    schema: { $ref: "#/definitions/user" },
                    description: "User found
            } */
    // find cart
    Cart.findOne({ user: user._id }, (err, cart) => {
      err && res.status(500).send({ message: `Error: ${err}` });
      !cart && res.status(404).send({ message: "No cart found" });
      /* #swagger.responses[200] = {
                        schema: { $ref: "#/definitions/cart" },
                        description: "Cart found."
                } */
      res.status(200).json(cart);
    })
      .populate("user")
      .populate("products");
  });
};

module.exports = { findAllUsers, findCartById };
