const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creates a Comment
const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
  orderDate: { type: Schema.Types.Date, required: true },
  shippingAddress: { type: String, required: false },
});

//export
module.exports = Comment = mongoose.model("order", OrderSchema);
