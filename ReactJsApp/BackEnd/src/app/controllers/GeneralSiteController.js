const { Model: Courses } = require('../models/Course')
const mongoToObject=require('../../util/mongoose.js')
class GeneralSiteController {
  async home(req, res) {
    try {
      let data = await Courses.find();
      res.render('home', { courses: mongoToObject(data) })
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
  // home(req,res,next){
  //   query
  //     .then((courses)=>res.json(courses))
  //     .catch(next)
  // }
  search(req, res) {
    res.render('search');
  }
}
module.exports = new GeneralSiteController();
