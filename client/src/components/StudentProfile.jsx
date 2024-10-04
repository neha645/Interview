import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllStudents } from '../services/student';


const StudentProfile = () => {
  const { stdId } = useParams(); // Get student ID from URL params
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();


  useEffect(()=>{
    const fetchStudents = async () => {
      const data = await getAllStudents();
      console.log('data', data);
      setStudents(data);
      }
      fetchStudents();
  }, []);


  // Find the student by ID
  const student = students.find(student => student.id == stdId);

  // Handle navigation to the interview records page
  const handleViewInterview = () => {
    navigate(`/student/interviews/${stdId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 flex flex-col justify-center items-center py-10">
      <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">
        {student ? student.name : 'Student'}'s Profile
      </h2>

      <div className="max-w-3xl w-full bg-white rounded-lg shadow-xl flex flex-col md:flex-row overflow-hidden transition-transform transform hover:scale-105">
        <div className="w-full md:w-1/3 bg-indigo-600 flex items-center justify-center p-6">
          <div className="w-36 h-36 bg-white text-6xl font-bold text-indigo-600 flex items-center justify-center rounded-full shadow-lg">
            {student ? student.name.charAt(0) : '?'}
          </div>
        </div>
        <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
          {student ? (
            <>
              <div className="space-y-4">
                <p className="text-lg">
                  <strong>Name:</strong> <span className="text-gray-700">{student.name}</span>
                </p>
                <p className="text-lg">
                  <strong>Class:</strong> <span className="text-gray-700">{student.class}</span>
                </p>
                <p className="text-lg">
                  <strong>Phone:</strong> <span className="text-gray-700">{student.phone}</span>
                </p>
                <p className="text-lg">
                  <strong>Email:</strong> <span className="text-gray-700">{student.email}</span>
                </p>
                <p className="text-lg">
                  <strong>Date of Birth:</strong> <span className="text-gray-700">{student.dob}</span>
                </p>
                <p className="text-lg">
                  <strong>Level:</strong> <span className="text-gray-700">{student.level}</span>
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleViewInterview}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                >
                  View Interview Records
                </button>
              </div>
            </>
          ) : (
            <h2 className="text-2xl font-semibold text-red-500">
              Student not found
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;