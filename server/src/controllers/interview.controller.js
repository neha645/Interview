import * as interviewService from '../services/interview.service.js';

export const getAllInterviews = async (req, res) => {
    try {
        const interviews = await interviewService.getAllInterviews();
        console.log(`Interviews retrieved successfully. Total: ${interviews.length} interviews found.`,interviews);   
        res.status(200).json(interviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getInterviewById = async (req, res) => {
    try {
        const interview = await interviewService.getInterviewById(req.params.id);
        if (interview) {
            res.status(200).json(interview);
        } else {
            res.status(404).json({ message: 'Interview not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createInterview = async (req, res) => {
    try {
        const interview = await interviewService.createInterview(req.body);
        res.status(201).json(interview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateInterview = async (req, res) => {
    try {
        const interview = await interviewService.updateInterview(req.params.id, req.body);
        if (interview) {
            res.status(200).json(interview);
        } else {
            res.status(404).json({ message: 'Interview not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteInterview = async (req, res) => {
    try {
        const result = await interviewService.deleteInterview(req.params.id);
        if (result) {
            res.status(200).json({ message: 'Interview deleted successfully' });
        } else {
            res.status(404).json({ message: 'Interview not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
