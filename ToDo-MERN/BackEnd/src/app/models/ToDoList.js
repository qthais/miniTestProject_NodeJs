const mongoose=require('mongoose')
const Schema=mongoose.Schema
const List = new Schema({
    id: Number,
    name: String
  });
const ListModel= mongoose.model('List', List, 'todoappcollection');
module.exports= ListModel