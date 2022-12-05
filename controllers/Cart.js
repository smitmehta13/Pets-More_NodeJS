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
    if (user) {
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
    }
  });
};

// Create a new cart
const createCart = (req, res) => {
  // #swagger.tags = ["Cart"];
  // #swagger.description = "Endpoint to create a cart.";
  /* #swagger.parameters['newCart'] = {
                    in: 'body',
                    description: 'Cart Information.',
                    required: true,
                    schema: { $ref: "#/definitions/cart" }
            } */
  // find user
  User.findOne({ id: req.body.userId }, (err, user) => {
    err && res.status(500).send({ message: `Error: ${err}` });
    !user && res.status(404).send({ message: "No user found" });
    /* #swagger.responses[200] = {
                        schema: { $ref: "#/definitions/user" },
                        description: "User found
                } */
    if (user) {
      // check if user has a cart
      Cart.findOne({ user: user._id }, (err, cart) => {
        err && res.status(500).send({ message: `Error: ${err}` });
        /* #swagger.responses[200] = {
                        schema: { $ref: "#/definitions/cart" },
                        description: "Cart found."
                } */
        // if the user has a cart, return error
        if (cart) {
          res.status(409).send({ message: "User already has a cart" });
        } else {
          // create new cart
          let cart = new Cart();
          cart.user = user._id;
          cart.products = [];
          cart.save((err, cart) => {
            err && res.status(500).send({ message: `Error: ${err}` });
            !err && res.status(200).json(cart);
          });
        }
      })
        .populate("user")
        .populate("products");
    }
  });
};

// update a cart by user id
const updateCart = (req, res) => {
  console.log(req.body);
  // #swagger.tags = ["Cart"];
  // #swagger.description = "Endpoint to update a cart by user id.";
  /* #swagger.parameters['id'] = {
                    in: 'path',
                    description: 'User id.',
                    required: true,
                    type: 'integer'
            } */
  /* #swagger.parameters['cart'] = {
                    in: 'body',
                    description: 'Cart Information.',
                    required: true,
                    schema: { $ref: "#/definitions/productIds" }
            } */
  // find user
  User.findOne({ id: req.params.id }, (err, user) => {
    err && res.status(500).send({ message: `Error: ${err}` });
    !user && res.status(404).send({ message: "No user found" });
    /* #swagger.responses[200] = {
                            schema: { $ref: "#/definitions/user" },
                            description: "User found
                    } */
    if (user) {
      // find cart
      Cart.findOne({ user: user._id }, (err, cart) => {
        err && res.status(500).send({ message: `Error: ${err}` });
        !cart && res.status(404).send({ message: "No cart found" });
        /* #swagger.responses[200] = {
                            schema: { $ref: "#/definitions/cart" },
                            description: "Cart found."
                    } */
        if (cart) {
          // update cart
          cart.products = req.body.products;
          cart.save((err, cart) => {
            err && res.status(500).send({ message: `Error: ${err}` });
            !err && res.status(200).json(cart);
          });
        }
      })
        .populate("user")
        .populate("products");
    }
  });
};

// delete a cart by user id
const deleteCart = (req, res) => {
  // #swagger.tags = ["Cart"];
  // #swagger.description = "Endpoint to delete a cart by user id.";
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
    if (user) {
      // find cart
      Cart.findOne({ user: user._id }, (err, cart) => {
        err && res.status(500).send({ message: `Error: ${err}` });
        !cart && res.status(404).send({ message: "No cart found" });
        /* #swagger.responses[200] = {
                                schema: { $ref: "#/definitions/cart" },
                                description: "Cart found."
                        } */
        if (cart) {
          // delete cart
          cart.remove((err) => {
            err && res.status(500).send({ message: `Error: ${err}` });
            !err && res.status(200).send({ message: "Cart deleted" });
          });
        }
      })
        .populate("user")
        .populate("products");
    }
  });
};

module.exports = {
  findAllUsers,
  findCartById,
  createCart,
  updateCart,
  deleteCart,
};
