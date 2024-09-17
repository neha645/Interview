import React, { useEffect, useState } from 'react';
import { getAllStudents } from '../services/student';
import studentdata from './student.json';

const levels = [1, 2, 3];
const sublevels = ['A', 'B', 'C'];

const Dashboard = () => {
  const [students, setStudents] = useState(studentdata);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAllStudents();
        setStudents(response);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    // fetchStudents();
  }, []);

  const getLevelCounts = (level) => {
    const levelStudents = students.filter(student =>
      student.level.startsWith(level) ||
      student.interviews.some(interview => interview.level === level)
    );

    const passed = students.filter(student =>
      student.interviews.some(interview => interview.level === level && interview.result === 'passed')
    ).length;

    const failed = students.filter(student =>
      student.interviews.some(interview => interview.level === level && interview.result === 'failed')
    ).length;

    const current = students.filter(student => student.level === level).length;

    return { current, passed, failed };
  };

  return (
    <div className='min-h-screen bg-gray-100 flex justify-center py-6'>
      <div className='flex flex-col gap-10 container mx-auto px-4'>
        <h1 className='font-semibold text-center text-4xl text-gray-800'>Interview Management</h1>

        {levels.map((level) => (
          <div key={level}>
            <h1 className='text-center font-semibold text-2xl text-gray-700 mb-6'>Level {level}</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
              {sublevels.map((sublevel) => {
                const { current, passed, failed } = getLevelCounts(`${level}${sublevel}`);

                return (
                  <div
                    key={`${level}-${sublevel}`}
                    className='flex flex-col justify-between items-center gap-6 bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105'
                  >
                    <div className='flex justify-between w-full'>
                      <h1 className='text-lg font-semibold text-gray-600'>{`Level ${level}${sublevel}`}</h1>
                      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'>
                        View
                      </button>
                    </div>

                    <div className='flex justify-between w-full mt-4'>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-indigo-600">{current}</p>
                        <p className="text-sm text-gray-500">Current Students</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-600">{passed}</p>
                        <p className="text-sm text-gray-500">Passed Students</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-red-600">{failed}</p>
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