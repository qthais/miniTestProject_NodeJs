const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
// CourseController.index
router.get('/me',userController.update)
router.get('/:slug', userController.show);
module.exports = router;