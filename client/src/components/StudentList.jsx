import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { level } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); 
  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '',
    phone: '',
    email: '',
    dob: '',
  }); // State for new student data

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add new student to the list
    const updatedStudents = [...students, [newStudent]];
    // setStudents(updatedStudents);
    // localStorage.setItem('student_data', JSON.stringify(updatedStudents));

    // Reset form and close modal
    setNewStudent({ name: '', class: '', phone: '', email: '', dob: '' });
    setShowModal(false);
  };
  // UseMemo to filter students based on level or show all students
  const studentList = useMemo(() => {
    const filteredStudents = level === 'all' ? students : students.filter(student => student.level === level);
    return filteredStudents.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase())
    );    
  }, [students, level, searchTerm]);

  useEffect(() => {
    const data = localStorage.getItem('student_data');
    if (data) {
      setStudents(JSON.parse(data));
    } else {
      console.log('Student data not found');
    }
  }, []);

  const handleView = (stdId) => {
    navigate(`/student/${stdId}`);
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex flex-col items-center py-8">
      <div className="max-w-7xl w-full px-6">
        {/* Dynamic Heading and Controls */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {level === 'all' ? `Total Students` : `Students for Level ${level}`}
          </h1>

          {level === 'all' && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
            >
              Add New Student
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-700 font-semibold">Total Students: {studentList.length}</p>
          </div>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Student Table */}
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">SR.</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Class</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Level</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {studentList.map((student, index) => (
                <tr
                  key={student.id}
                  className={`border-b border-gray-200 hover:bg-blue-50 transition duration-150 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="py-3 px-6 text-left">{index + 1}</td>
                  <td className="py-3 px-6">{student.name}</td>
                  <td className="py-3 px-6">{student.class}</td>
                  <td className="py-3 px-6">{student.phone}</td>
                  <td className="py-3 px-6">{student.email}</td>
                  <td className="py-3 px-6">{student.level}</td>
                  <td className="py-3 px-6 text-left">
                    <button
                      onClick={() => handleView(student.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
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
      {/* Modal Popup for Adding New Student */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Add New Student</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="w-full border px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Class</label>
                <input
                  type="text"
                  value={newStudent.class}
                  onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                  className="w-full border px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                  className="w-full border px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="w-full border px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  value={newStudent.dob}
                  onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })}
                  className="w-full border px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;