import { axiosInstance } from "./axiosInstance";

export const addNewInterview = async (interviewData) => {
    try {
        const response = await axiosInstance.post("/interviews", interviewData);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllInterviews = async () => {
    try {
        const response = await axiosInstance.get("/interviews");
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

