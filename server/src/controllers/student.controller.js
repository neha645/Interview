import * as studentService from '../services/student.service.js';

export const getAllStudents = async (req, res) => {
    try {
        const students = await studentService.getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getStudentById = async (req, res) => {
    try {
        const student = await studentService.getStudentById(req.params.id);
        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createStudent = async (req, res) => {
    try {
        const student = await studentService.createStudent(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const student = await studentService.updateStudent(req.params.id, req.body);
        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const result = await studentService.deleteStudent(req.params.id);
        if (result) {
            res.status(200).json({ message: 'Student deleted successfully' });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getInterviewsByStudentId = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await studentService.getStudentWithInterviews(studentId);
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};