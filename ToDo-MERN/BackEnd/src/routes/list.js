const express = require('express');
const router = express.Router();
const ListController=require('../app/controllers/ListController.js')
router.get('/list',ListController.show)
router.delete('/delete/:id',ListController.delete)
router.post('/add',ListController.add)
router.put('/update/:id',ListController.update)
module.exports=router