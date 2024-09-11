const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const danhmuc = new Schema(
  {
    name:{type:String},
  },{
    timestamps: true 
});

module.exports = mongoose.model('danhmuc', danhmuc);
