const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const autoIncrementModelID = require('./Counter');


//creates a Product
const ProductSchema = new Schema({
    id: {type: Number ,
    unique: true
    },
    description:{type: String,required: true},
    image:{type:String},
    pricePerUnit:{type: Number,required: true},
    shippingCost:{type: Number,required: true}
});
ProductSchema.pre('save', function (next) {
    if (!this.isNew) {
      next();
      return;
    }
  
    autoIncrementModelID('products', this, next);
  });

//export
module.exports = Product = mongoose.model('Product',ProductSchema);