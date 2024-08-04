const mongoose = require('mongoose');
     //@->%40 ( encode @)
async function connect(){
    try{
        await mongoose.connect('mongodb+srv://Qthais:Phuongtrang14%40@cluster0.migzqbt.mongodb.net/todoappdb?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connect successfully")
    }catch(err){
        console.log(err)
    }
}
module.exports={connect}