const Cart = require("../models/Cart");

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

module.exports = { findAllUsers };
