const express = require('express');
const router = express.Router();
const ListController=require('../app/controllers/ListController.js')
const { adminAuth, userAuth} = require("../app/controllers/auth/authToken")
router.get('/list',ListController.show)
router.delete('/delete/:id',adminAuth,ListController.delete)
router.post('/add',ListController.add)
router.put('/update/:id',userAuth,ListController.update)
module.exports=router