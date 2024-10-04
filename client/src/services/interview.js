import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

// Function to get interviews for a specific student
export const getInterviewsByStudentId = async (studentId) => {
    try {
        // Get all students from localStorage or server
        const data = localStorage.getItem("students");
        const students = data ? JSON.parse(data) : (await axios.get("http://localhost:3000/students")).data;

        // Find the specific student by ID
        const student = students.find(std => std.id === studentId);

        // If student exists, return the interviews, otherwise return an empty array
        return student ? student.interviews : [];
    } catch (error) {
        console.error("Error fetching interviews:", error);
    }
};


// Function to add a new interview for a specific student
export const addInterview = async (studentId, interviewData) => {
    try {
        const data = localStorage.getItem("students");
        const students = data ? JSON.parse(data) : (await axios.get("http://localhost:3000/students")).data;

        const studentIndex = students.findIndex(std => std.id === studentId);

        if (studentIndex === -1) {
            throw new Error("Student not found");
        }

        // Generate a unique ID for the new interview
        const newInterview = { id: uuidv4(), stdId: studentId, ...interviewData };

        // Add the new interview to the student's interviews array
        students[studentIndex].interviews = [...students[studentIndex].interviews, newInterview];

        // Save updated students data to localStorage
        localStorage.setItem("students", JSON.stringify(students));

        // Update the student data on the server
        await axios.put(`http://localhost:3000/students/${studentId}`, students[studentIndex]);

        return newInterview;
    } catch (error) {
        console.error("Error adding interview:", error);
    }
};
