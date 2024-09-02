const mongoose = require('mongoose');
     //@->%40 ( encode @)
async function connect(){
    try{
        await mongoose.connect('mongodb://mongo:27017/mydatabase');
        console.log("Connect successfully")
    }catch(err){
        console.log(err)
    }
}
module.exports={connect}