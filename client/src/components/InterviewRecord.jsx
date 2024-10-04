import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllStudents } from '../services/student';
import { getInterviewsByStudentId, addInterview } from '../services/interview';

const StudentInterviews = () => {
  const { stdId } = useParams();
  const [students, setStudents] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newInterview, setNewInterview] = useState({
    level: '',
    skills: '',
    score: 0,
    result: '',
    interviewer: '',
    date: '',
  });

  useEffect(() => {
    const fetchStudentsAndInterviews = async () => {
      const data = await getAllStudents();
      setStudents(data);
      
      const studentInterviews = await getInterviewsByStudentId(stdId);
      setInterviews(studentInterviews); // Set interviews state
    };

    fetchStudentsAndInterviews();
  }, [stdId]);

  const student = students.find(student => student.id == stdId);

  // Handle form submission for adding a new interview
  const handleAddInterview = async (e) => {
    e.preventDefault();
    const addedInterview = await addInterview(stdId, newInterview);

    // Update the interviews list with the newly added interview
    setInterviews([...interviews, addedInterview]);
    setShowModal(false); // Close modal after adding interview
  };

  // Function to get slider color based on score
  const getSliderColor = (score) => {
    if (score < 5) return 'bg-red-500'; // Red for score < 5
    if (score === 5) return 'bg-yellow-500'; // Yellow for score = 5
    return 'bg-green-500'; // Green for score > 5
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {student ? (
        <div className="max-w-4xl w-full px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Interview Records for {student.name}
          </h1>
          <div className="flex justify-between items-center bg-white p-2 rounded-lg shadow-md">
            <p className="text-lg font-semibold">Total Interviews: {interviews.length}</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 text-white text-sm px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
              Add New Interview
            </button>
          </div>
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

      {/* Modal Popup for Adding New Interview */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Add New Interview</h2>
            <form onSubmit={handleAddInterview} className="space-y-4">
              {/* Row with Level and Skills */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Level</label>
                  <select
                    value={newInterview.level}
                    onChange={(e) => setNewInterview({ ...newInterview, level: e.target.value })}
                    className="w-full border px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="1A">Level 1A</option>
                    <option value="1B">Level 1B</option>
                    <option value="1C">Level 1C</option>
                    <option value="2A">Level 2A</option>
                    <option value="2B">Level 2B</option>
                    <option value="2C">Level 2C</option>
                    <option value="3A">Level 3A</option>
                    <option value="3B">Level 3B</option>
                    <option value="3C">Level 3C</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Skills</label>
                  <input
                    type="text"
                    value={newInterview.skills}
                    onChange={(e) => setNewInterview({ ...newInterview, skills: e.target.value })}
                    className="w-full border px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Score Range Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Score</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={newInterview.score}
                  onChange={(e) => setNewInterview({ ...newInterview, score: parseInt(e.target.value) })}
                  className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${getSliderColor(newInterview.score)}`}
                />
                <div className="flex justify-between text-sm text-gray-600">
                  {Array.from({ length: 11 }, (_, index) => (
                    <span key={index}>{index}</span>
                  ))}
                </div>
              </div>

              {/* Result Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Result</label>
                <select
                  value={newInterview.result}
                  onChange={(e) => setNewInterview({ ...newInterview, result: e.target.value })}
                  className="w-full border px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Result</option>
                  <option value="Passed">Passed</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>

              {/* Interviewer and Date in one row */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Interviewer</label>
                  <input
                    value={newInterview.interviewer}
                    onChange={(e) => setNewInterview({ ...newInterview, interviewer: e.target.value })}
                    className="w-full border px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    value={newInterview.date}
                    onChange={(e) => setNewInterview({ ...newInterview, date: e.target.value })}
                    className="w-full border px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Add Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentInterviews;
