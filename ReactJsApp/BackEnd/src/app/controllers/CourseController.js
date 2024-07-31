const { Model: Course } = require('../models/Course')
const mongoToObject = require('../../util/mongoose.js')
class CourseController {
  //GET
  show(req, res) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => res.render('courses/show', { course: course.toObject() }))

  }
  create(req, res, next) {
    res.render('courses/create')
  }
  async store(req, res, next) {
    try{
      const formData = req.body
      formData.image = `https://img.youtube.com/vi/${req.body.videoID}/default.jpg`
      const course = new Course(formData)
      await course.save()
      res.redirect('/')
    }
    catch(err){
      next(err)
    }
  }
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then(data => res.render('courses/editCourse', { course: data.toObject() }))
      .catch(next)
  }
  //PUT
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, 
    {
      name: req.body.name, 
      Description: req.body.description,
      videoID: req.body.videoID,
      level: req.body.level
    })
      .then(() => res.redirect('/user/me'))
      .catch(next)
  }
  //DELETE
  delete(req,res,next){
    Course.deleteOne({_id:req.params.id})
    .then(() => res.redirect('/user/me'))
    .catch(next)
  }
}
module.exports = new CourseController();
