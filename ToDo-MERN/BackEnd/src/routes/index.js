
const listRouter=require('./list')
const authRouter=require('./auth')
function route(app){
    app.use(('/'),listRouter)
    app.use('/api/auth',authRouter)
}
module.exports=route