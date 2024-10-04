import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchOneStudentMutation } from '../../slices/adminApiSlice';
import { motion } from 'framer-motion';
import { AiOutlineUser, AiOutlineFile, AiOutlineCheckCircle } from 'react-icons/ai';


const statusSteps = [
    'Inquiry',
    'Assessment',
    'Offer Letter',
    'Fees Paid',
    'Acceptance Letter',
    'VFS date booked',
    'File Submitted',
    'Visa Approved'
  ];

export default function StudentDetailedTrack() {
  const { id } = useParams();
  const [fetchOneStudent] = useFetchOneStudentMutation();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(0); // Tab state for navigation

  useEffect(() => {
    const getStudentData = async () => {
      try {
        const response = await fetchOneStudent(id);
        if (response?.data) {
          setStudent(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };
    getStudentData();
  }, [fetchOneStudent, id]);

  const handleTabChange = (index) => {
    setCurrentTab(index);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
        <p className="ml-4 text-lg font-semibold">Loading student details...</p>
      </div>
    );
  }

  if (!student) {
    return <div>No student found.</div>;
  }

  const {
    firstName,
    middleName,
    lastName,
    dob,
    emailID,
    address,
    state,
    country,
    city,
    photo,
    Course,
    University,
    status,
  } = student;
  // Mapping the status to its index in the steps array for current progress
    const getCurrentStepIndex = (status) => {
    return statusSteps.indexOf(status);
  };
  
  const currentStepIndex = getCurrentStepIndex(status);
  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">Student Tracking Details</h1>

      {/* Tabs Navigation */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => handleTabChange(0)}
          className={`flex items-center px-6 py-3 rounded-t-md transition-colors duration-200 ${currentTab === 0 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          <AiOutlineUser className="mr-2" /> Personal Details
        </button>
        <button
          onClick={() => handleTabChange(1)}
          className={`flex items-center px-6 py-3 rounded-t-md mx-2 transition-colors duration-200 ${currentTab === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          <AiOutlineFile className="mr-2" /> Application Details
        </button>
        <button
          onClick={() => handleTabChange(2)}
          className={`flex items-center px-6 py-3 rounded-t-md transition-colors duration-200 ${currentTab === 2 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          <AiOutlineCheckCircle className="mr-2" /> Current Status
        </button>
      </div>

      {/* Tab Content with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        key={currentTab}
        className="p-8 border rounded-md shadow-md bg-white"
      >
        {currentTab === 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Personal Details</h2>
            <div className="flex items-start">
              <div className="w-32 h-32 mr-8">
                {photo ? (
                  <img
                    src={photo}
                    alt="Student"
                    className="rounded-full w-full h-full object-cover shadow-lg"
                  />
                ) : (
                  <div className="bg-gray-200 rounded-full w-full h-full flex items-center justify-center text-gray-500">
                    No Photo
                  </div>
                )}
              </div>
              <div>
                <p className="mb-2"><strong>Name:</strong> {`${firstName} ${middleName} ${lastName}`}</p>
                <p className="mb-2"><strong>DOB:</strong> {dob}</p>
                <p className="mb-2"><strong>Email:</strong> {emailID}</p>
                <p><strong>Address:</strong> {`${address}, ${city}, ${state}, ${country}`}</p>
              </div>
            </div>
          </div>
        )}

        {currentTab === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Application Details</h2>
            <div className="flex space-x-8 items-center">
              <div className="w-24 h-24">
                <img
                  src={University?.logo}
                  alt="University Logo"
                  className="rounded-lg shadow-lg object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="mb-2"><strong>Course Applied:</strong> {Course?.name || 'N/A'}</p>
                <p className="mb-2"><strong>University:</strong> {University?.name || 'N/A'}</p>
                <p className="mb-2"><strong>Grade:</strong> {University?.grade || 'N/A'}</p>
                <p className="mb-2"><strong>Type:</strong> {University?.type || 'N/A'}</p>
                <p><strong>Rank:</strong> {University?.rank || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

{currentTab === 2 && (
  <div>
    <h2 className="text-2xl font-bold mb-6">Current Status</h2>

    {/* Custom Timeline */}
    <div className="relative">
      <div className="absolute border-l-4 border-blue-500 h-full left-5 top-0"></div>
      <ul className="ml-12">
        {statusSteps.map((step, index) => (
          <li
            key={index}
            className={`mb-8 pl-4 relative ${
              index <= currentStepIndex ? 'text-blue-600 font-semibold' : 'text-gray-400'
            }`}
          >
            <div
              className={`absolute -left-7 w-5 h-5 rounded-full border-4 ${
                index <= currentStepIndex ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'
              }`}
            ></div>
            {step}
          </li>
        ))}
      </ul>
    </div>

    <p className="text-lg mt-6">
      <strong>Current Application Status: </strong>
      <span className="text-green-600">{status}</span>
    </p>
  </div>
)}
      </motion.div>
    </div>
  );
}
