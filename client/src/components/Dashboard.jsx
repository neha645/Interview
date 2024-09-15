import React, { useState } from 'react';
import studentData from './student.json';

const levels = [1, 2, 3];
const sublevels = ['A', 'B', 'C'];

const Dashboard = () => {
  const [students] = useState(studentData);

  const getLevelCounts = (level) => {
    const levelStudents = students.filter(student => student.level.startsWith(level));
    const passed = levelStudents.filter(student => student.interviews.some(interview => interview.result === 'passed')).length;
    const failed = levelStudents.filter(student => student.interviews.some(interview => interview.result === 'failed')).length;
    const current = levelStudents.length;

    return { current, passed, failed };
  };

  return (
    <div className='min-h-screen bg-zinc-300 flex justify-center'>
      <div className='flex flex-col gap-10'>
        <h1 className='text-2xl font-semibold text-center'>Interview Management</h1>

        {levels.map((level) => (
          <div key={level}>
            <h1 className='text-center font-semibold text-xl mb-4'>Level {level}</h1>

            <div className='flex justify-between gap-10'>
              {sublevels.map((sublevel) => {
                // Do the variable declaration outside the JSX
                const { current, passed, failed } = getLevelCounts(`${level}${sublevel}`);

                return (
                  <div key={`${level}-${sublevel}`} className='flex justify-center items-center flex-col gap-4 w-60 bg-zinc-100 p-4 rounded shadow '>
                    <div className='flex justify-between w-full'>
                      <h1>{`Level ${level}${sublevel}`}</h1>
                      <button className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'>
                        View
                      </button>
                    </div>

                    <div className='flex justify-between w-full'>
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
