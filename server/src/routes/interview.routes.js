import express from 'express';
const router = express.Router();
import * as interviewController from '../controllers/interview.controller.js';

router.get('/', interviewController.getAllInterviews);
router.get('/:id', interviewController.getInterviewById);
router.post('/', interviewController.createInterview);
router.put('/:id', interviewController.updateInterview);
router.delete('/:id', interviewController.deleteInterview);

export default router;
