const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const schema=mongoose.Schema;
const Course = new schema({
    name: {type: String,required:true},
    Description: String,
    videoID:{type: String,required:true},
    image:String,
    level:String,
    slug: { type: String, slug: 'name',unique:true },
  },{
    timestamps:true,
  });
  const Model = mongoose.model('course', Course);
module.exports={Model}