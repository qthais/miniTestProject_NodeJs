const mongoose = require('mongoose');
async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/school');
        console.log("Connect successfully")
    }catch(err){
        console.log("Fail Connecting")
    }
}
module.exports={connect}