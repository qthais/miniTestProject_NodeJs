const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');
// CourseController.index
router.get('/create',courseController.create)
router.post('/store',courseController.store)
router.put('/update/:id',courseController.update)
router.delete('/delete/:id',courseController.delete)
router.get('/:id/edit',courseController.edit)
router.get('/:slug', courseController.show);
module.exports = router;