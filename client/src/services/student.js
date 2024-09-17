import { axiosInstance } from "./axiosInstance";

export const getAllStudents = async () => {
    try {
        const response = await axiosInstance.get("/students");
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getStudentById = async (studentId) => {
    try {
        const response = await axiosInstance.get(`/students/${studentId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createStudent = async (studentData) => {
    try {
        const response = await axiosInstance.post("/students", studentData);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getInterviewByStudentId = async (studentId) => {
    try {
        const response = await axiosInstance.get(`/students/interviews/${studentId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};
