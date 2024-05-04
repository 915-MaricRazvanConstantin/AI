const express = require('express')
const StudentController = require('../controller/StudentController')
const router = express.Router()

router.get('/ping', StudentController.ping);
router.get('/', StudentController.getAllStudents);
router.post('/', StudentController.createStudent);
router.get('/:id', StudentController.getStudentByID);
router.put('/:id', StudentController.updateStudent);
router.delete('/:id', StudentController.deleteStudent);

module.exports = {router};