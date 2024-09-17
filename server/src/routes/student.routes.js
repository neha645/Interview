import express from 'express';
const router = express.Router();
import * as studentController from '../controllers/student.controller.js';

router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);
router.get('/interviews/:id', studentController.getInterviewsByStudentId);

export default router;
