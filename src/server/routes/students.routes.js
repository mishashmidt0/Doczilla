import Router from 'express'
import StudentController from "../controller/student.controller.js";

const studentController = new StudentController()
const router = new Router()

router.post('/student', studentController.createStudent)
router.get('/student', studentController.getStudents)
router.delete('/student/:id', studentController.deleteStudent)

export default router
