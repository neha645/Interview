import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import studentData from './student.json';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const { level } = useParams();
  const levelStudents = students.filter(student => student.level === level);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('student_data');
   if(!data) {
    console.log('Student data not found');
    
   }
    setStudents(JSON.parse(data));
  }, []);
  
  const handleView = (stdId) => {
    navigate(`/student/${stdId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="max-w-7xl w-full px-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
          Students for Level {level}
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">SR.</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Class</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {levelStudents.map((student, index) => (
                <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{index + 1}</td>
                  <td className="py-3 px-6">{student.name}</td>
                  <td className="py-3 px-6">{student.class}</td>
                  <td className="py-3 px-6">{student.phone}</td>
                  <td className="py-3 px-6">{student.email}</td>
                  <td className="py-3 px-6 text-left">
                    <button
                      onClick={() => handleView(student.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;