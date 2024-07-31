const newsRouter = require('./news');
const siteRouter = require('./GeneralSite');
const courseRouter=require('./Courses')
const userRouter=require('./user')
function route(app) {
  app.use('/courses',courseRouter)
  app.use('/news', newsRouter);
  app.use('/user',userRouter)
  app.use('/', siteRouter);
}
module.exports = route;
