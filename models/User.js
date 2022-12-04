const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const autoIncrementModelID = require('./Counter');

//creates a schema
const UserSchema = new Schema({
    id: {type: Number ,
    unique: true
    
    },
    name:{type: String},
    email:{type: String},
    password:{type: String},
    shippingAddress:{type:String}
});

UserSchema.pre('save', function (next) {
    if (!this.isNew) {
      next();
      return;
    }
    autoIncrementModelID('users', this, next);
  });


  
  
       
module.exports = User = mongoose.model('User',UserSchema);