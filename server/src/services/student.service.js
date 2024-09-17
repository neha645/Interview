import Student from '../models/student.model.js';

export const getAllStudents = () => {
    return Student.find().populate('interviews');
};

export const getStudentById = (id) => {
    return Student.findById(id).populate('interviews');
};

export const createStudent = (studentData) => {
    const student = new Student(studentData);
    return student.save();
};

export const updateStudent = (id, studentData) => {
    return Student.findByIdAndUpdate(id, studentData, { new: true }).populate('interviews');
};

export const deleteStudent = (id) => {
    return Student.findByIdAndDelete(id);
};

export const addInterviewToStudent = async (studentId, interviewId) => {
    try {
        const student = await Student.findById(studentId);
        if (!student) {
            throw new Error('Student not found');
        }
        student.interviews.push(interviewId);
        await student.save();        
        return student;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getStudentWithInterviews = async (studentId) => {
    try {
        const student = await Student.findById(studentId).populate('interviews');
        if (!student) {
            throw new Error('Student not found');
        }
        return student;
    } catch (error) {
        throw new Error(error.message);
    }
};