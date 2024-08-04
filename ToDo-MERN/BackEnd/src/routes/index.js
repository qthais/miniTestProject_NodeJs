
const listRouter=require('./list')
function route(app){
    app.use(('/'),listRouter)
}
module.exports=route