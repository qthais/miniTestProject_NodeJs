const mongoose=require('mongoose')
const Schema=mongoose.Schema
const List = new Schema({
    id: Number,
    name: String
  });
const Model= mongoose.model('List', List, 'todoappcollection');
module.exports= Model