import Interview from '../models/interview.model.js';
import { addInterviewToStudent } from './student.service.js';

export const getAllInterviews = () => {
    return Interview.find();
};

export const getInterviewById = (id) => {
    return Interview.findById(id);
};

export const createInterview = async (interviewData) => {
    try {
        // Create and save the interview
        const interview = new Interview(interviewData);
        await interview.save();
        console.log(interview);

        // Update the student to include the interview ID
        await addInterviewToStudent(interviewData.stdId, interview._id);

        return interview;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateInterview = (id, interviewData) => {
    try {
        return Interview.findByIdAndUpdate(id, interviewData, { new: true });
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteInterview = (id) => {
    try {
        return Interview.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error.message);
    }
};