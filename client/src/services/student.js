import axios from "axios";
import { v4 as uuidv4 } from 'uuid';  


// Function to get all students
export const getAllStudents = async () => {
    // Check if data exists in localStorage
    const cachedData = localStorage.getItem('students');

    if (cachedData) {
        return JSON.parse(cachedData); // Return cached data
    }

    try {
        // Fetch data from the server
        const response = await axios.get("http://localhost:3000/students");

        // Cache the data in localStorage
        localStorage.setItem("students", JSON.stringify(response.data));

        return response.data; // Return the fetched data
    } catch (error) {
        console.error("Error fetching students:", error);
        return [];
    }
};


// Function to add a new student with a UUID
export const addStudent = async (studentData) => {
    try {
        // Generate a unique ID using uuid
        const customId = Date.now();

        // Add the custom ID to the studentData
        const newStudent = { id: customId,interviews:[], ...studentData };

        // Fetch cached data from localStorage
        const cachedData = localStorage.getItem("students");

        // Make POST request to add the new student to the server
        const response = await axios.post("http://localhost:3000/students", newStudent);

        // Update localStorage with the new student
        localStorage.setItem("students", JSON.stringify([...JSON.parse(cachedData), response.data]));

        return response.data;  // Return the added student data
    } catch (error) {
        console.error("Error adding student:", error);
    }
};

