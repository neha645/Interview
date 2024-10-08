import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllStudents } from '../services/student';

const levels = [1, 2, 3];
const sublevels = ['A', 'B', 'C'];

const Dashboard = () => {
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

  const getLevelCounts = (level) => {
    const levelStudents = students.filter(student => student.level === level);

    const passed = students.filter(student =>
      student.interviews.some(interview => interview.level === level && interview.result === 'Passed')
    ).length;

    const failed = students.filter(student =>
      student.interviews.some(interview => interview.level === level && interview.result === 'Failed')
    ).length;

    const current = levelStudents.length;

    return { current, passed, failed };
  };

  const handleStudentList = (level) => {
    navigate(`/students/level/${level}`);
  };


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-2">
      <div className="container mx-auto flex flex-col gap-6">
        <h1 className="font-bold text-center text-2xl text-gray-800 ">
          Interview Management System
        </h1>

        <div className='flex justify-between items-center bg-white p-2 rounded-lg shadow-md'>
          <p className="text-lg font-semibold">Total Students: {students.length}</p>
          <button
            onClick={() => handleStudentList('all')}
            className='bg-blue-500 text-white text-sm px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200'>
            View Student
          </button>
        </div>

        {levels.map((level) => (
          <div key={level} className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sublevels.map((sublevel) => {
                const { current, passed, failed } = getLevelCounts(`${level}${sublevel}`);

                return (
                  <div
                    key={`${level}-${sublevel}`}
                    className="flex flex-col justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105"
                  >
                    <div className="flex justify-between w-full">
                      <h1 className="text-xl font-bold text-gray-700">{`Level ${level}${sublevel}`}</h1>
                      <button
                        onClick={() => handleStudentList(`${level}${sublevel}`)}
                        className="bg-blue-500 text-white text-xs px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                        View

                      </button>
                    </div>

                    <div className="flex justify-between w-full mt-4 space-x-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-indigo-600">{current}</p>
                        <p className="text-sm text-gray-500">Current Students</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{passed}</p>
                        <p className="text-sm text-gray-500">Passed Students</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">{failed}</p>
                        <p className="text-sm text-gray-500">Failed Students</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Dashboard;