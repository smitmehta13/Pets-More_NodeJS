const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrementModelID = require('./Counter');


//creates a Comment
const OrderSchema = new Schema({
    id: {type: Number ,
    unique: true
    },
    userId:{type: Number,required: true},
    dateTime:{type: String,required: true},
    shippingAddress:{type: String,required: false},
});
OrderSchema.pre('save', function (next) {
    if (!this.isNew) {
      next();
      return;
    }
  
    autoIncrementModelID('order', this, next);
  });

//export
module.exports = Comment = mongoose.model('order',OrderSchema);