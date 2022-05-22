const Router = require('express');
const  StudentController  = require( "../controller/student.controller.js");

const studentController = new StudentController()
const router = new Router()

router.post('/student', studentController.createStudent)
router.get('/student', studentController.getStudents)
router.delete('/student/:id', studentController.deleteStudent)

module.exports = router
