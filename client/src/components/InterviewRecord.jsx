import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const StudentInterviews = () => {
  const { stdId } = useParams();

  // Convert stdId to number if it's a string
  const studentIdNumber = parseInt(stdId);
  const [students, setStudents] = useState([]);


  useEffect(() => {
    const data = localStorage.getItem('student_data');
    if (!data) {
      console.log('Student data not found');

    }
    setStudents(JSON.parse(data));
  }, []);

  // Find the student with the given ID
  const student = students.find(student => student.id === studentIdNumber);

  // Get interviews for that student
  const interviews = student ? student.interviews : [];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {student ? (
        <div className="max-w-4xl w-full px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Interview Records for {student.name}
          </h1>

          {interviews.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">SR. No.</th>
                    <th className="py-3 px-6 text-left">Level</th>
                    <th className="py-3 px-6 text-left">Skills</th>
                    <th className="py-3 px-6 text-left">Score</th>
                    <th className="py-3 px-6 text-left">Result</th>
                    <th className="py-3 px-6 text-left">Interviewer</th>
                    <th className="py-3 px-6 text-left">Date</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {interviews.map((interview, index) => (
                    <tr key={interview.id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left">{index + 1}</td>
                      <td className="py-3 px-6">{interview.level}</td>
                      <td className="py-3 px-6">{interview.skills}</td>
                      <td className="py-3 px-6">{interview.score}</td>
                      <td className="py-3 px-6">
                        <span className={interview.result === 'Passed' ? 'text-green-600' : 'text-red-600'}>
                          {interview.result}
                        </span>
                      </td>
                      <td className="py-3 px-6">{interview.interviewer}</td>
                      <td className="py-3 px-6">{interview.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xl text-gray-700 mt-6 text-center">
              No interviews found for {student.name}.
            </p>
          )}
        </div>
      ) : (
        <p className="text-xl text-red-500 mt-6">
          Student not found.
        </p>
      )}
    </div>
  );
};

export default StudentInterviews;