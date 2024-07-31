const { Model: Course } = require('../models/Course.js')
const mongoToObject=require('../../util/mongoose.js')
class UserController {
  //GET
  update(req, res,next) {
    Course.find({})
        .then(data=>res.render('me/myCourse', { courses: mongoToObject(data) }))
        .catch(next)
  }
  show(req,res,next){
    res.send("Update")
  }

}
  module.exports = new UserController();
