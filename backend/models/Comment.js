const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const autoIncrementModelID = require('./Counter');


//creates a Comment
const CommentSchema = new Schema({
    id: {type: Number ,
    unique: true
    },
    rating:{type: Number,required: true},
    text:{type: String,required: true},
    image:{type:String},
    userId:{type: Number,required: true},
    productId:{type: Number,required: true},
});
CommentSchema.pre('save', function (next) {
    if (!this.isNew) {
      next();
      return;
    }
  
    autoIncrementModelID('comments', this, next);
  });

//export
module.exports = Comment = mongoose.model('Comment',CommentSchema);