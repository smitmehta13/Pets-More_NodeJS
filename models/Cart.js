const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creates a schema
const CartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
});

// virtual for cart
CartSchema.virtual("url").get(function () {
  return "/cart/" + this._id;
});

// export model
module.exports = mongoose.model("Cart", CartSchema);
