import React, { useEffect, useState } from 'react';
import { useGetAssessmentByUserMutation } from '../../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssessment } from '../../slices/assessmentSlice';
import { toast } from 'react-toastify';
import { EyeIcon } from 'lucide-react';

export default function PartnerAssessmentView() {
    const [GetAssessmentByUser, { isSuccess, isLoading, error }] = useGetAssessmentByUserMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const { assessment } = useSelector((state) => state.assessment);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [selectedAssessment, setSelectedAssessment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = userInfo._id;
                const res = await GetAssessmentByUser(data);
                dispatch(fetchAssessment(res.data));
            } catch (error) {
                toast.error("Failed to fetch student data");
            }
        };

        fetchData();
    }, [GetAssessmentByUser, userInfo._id, dispatch]);

    // Filter by name and date range
    const filteredAssessments = assessment?.filter((std) => {
        const fullName = `${std.firstName} ${std.lastName}`.toLowerCase();
        const matchesName = fullName.includes(searchTerm.toLowerCase());

        const createdAt = new Date(std.createdAt);
        const matchesFromDate = fromDate ? new Date(fromDate) <= createdAt : true;
        const matchesToDate = toDate ? new Date(toDate) >= createdAt : true;

        return matchesName && matchesFromDate && matchesToDate;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredAssessments?.length / rowsPerPage);
    const currentStudents = filteredAssessments?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1); // Reset to first page
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleEyeClick = (assessment) => {
        setSelectedAssessment(assessment);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Set background color based on status
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-200';
            case 'shared':
                return 'bg-blue-200';
            case 'eligible':
                return 'bg-green-200';
            case 'ineligible':
                return 'bg-red-200';
            default:
                return '';
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Assessment Information</h2>

            {isLoading && <p className="text-gray-600">Loading data...</p>}
            {error && <p className="text-red-600">Error fetching data: {error.message}</p>}

            {/* Filters */}
            <div className="flex justify-between items-center mb-4">
                {/* Rows Per Page */}
                <div>
                    <label htmlFor="rowsPerPage" className="mr-2">Rows per page:</label>
                    <select
                        id="rowsPerPage"
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        className="border p-2 rounded"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                    </select>
                </div>

                {/* Search By Name */}
                <div>
                    <label htmlFor="searchTerm" className="mr-2">Search by Name:</label>
                    <input
                        type="text"
                        id="searchTerm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter name"
                        className="border p-2 rounded"
                    />
                </div>

                {/* Date Filters */}
                <div className="flex items-center">
                    <div className="mr-4">
                        <label htmlFor="fromDate" className="mr-2">From:</label>
                        <input
                            type="date"
                            id="fromDate"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="toDate" className="mr-2">To:</label>
                        <input
                            type="date"
                            id="toDate"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="border p-2 rounded"
                        />
                    </div>
                </div>
            </div>

            {/* Student Table */}
            {currentStudents && currentStudents.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-3 px-4 border-b">Create At</th>
                            <th className="py-3 px-4 border-b">Name</th>
                            <th className="py-3 px-4 border-b">Email</th>
                            <th className="py-3 px-4 border-b">Phone</th>
                            <th className="py-3 px-4 border-b">Country</th>
                            <th className="py-3 px-4 border-b">Course</th>
                            <th className="py-3 px-4 border-b">Status</th>
                            <th className="py-3 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.map((std, index) => (
                            <tr key={index} className={`hover:bg-gray-100 transition duration-200 ${getStatusColor(std.status)}`}>
                                <td className="py-3 px-4 border-b">{std.createdAt.split("T")[0]}</td>
                                <td className="py-3 px-4 border-b">{std.firstName} {std.lastName}</td>
                                <td className="py-3 px-4 border-b">{std.emailID || "N/A"}</td>
                                <td className="py-3 px-4 border-b">{std.mobileNumber}</td>
                                <td className="py-3 px-4 border-b">{std?.Country?.name}</td>
                                <td className="py-3 px-4 border-b">{std.Course}</td>
                                <td className="py-3 px-4 border-b">{std.status}</td>
                                <td className="py-3 px-4 border-b">
                                    <button onClick={() => handleEyeClick(std)}>
                                        <EyeIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600">No student data available.</p>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className={`p-2 border rounded ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    Previous
                </button>
                <p>Page {currentPage} of {totalPages}</p>
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`p-2 border rounded ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    Next
                </button>
            </div>

            {/* Custom Modal for Assessment Details */}
            {selectedAssessment && isModalOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full transition-transform transform scale-105">
                <h2 className="text-2xl font-semibold mb-6 text-center">Assessment Details</h2>
        
                {/* Displaying user details */}
                <div className="mb-4">
                    <p className="font-medium"><strong>Name:</strong> {selectedAssessment.firstName} {selectedAssessment.lastName}</p>
                    <p className="font-medium"><strong>Email:</strong> {selectedAssessment.emailID}</p>
                    <p className="font-medium"><strong>Phone:</strong> {selectedAssessment.mobileNumber}</p>
                    <p className="font-medium"><strong>Country:</strong> {selectedAssessment.Country?.name}</p>
                    <p className="font-medium"><strong>Course:</strong> {selectedAssessment.Course}</p>
                    <p className="font-medium"><strong>Status:</strong> {selectedAssessment.status}</p>
                </div>
        
                {/* Additional fields from the schema */}
                <div className="mb-4">
                    <p className="font-medium"><strong>Tracking ID:</strong> {selectedAssessment.trackingId}</p>
                    <p className="font-medium"><strong>Passport Number:</strong> {selectedAssessment.passportNumber}</p>
                    <p className="font-medium"><strong>Date of Birth:</strong> {selectedAssessment.dob}</p>
                    <p className="font-medium"><strong>Last Education:</strong> {selectedAssessment.lastEdu}</p>
                    <p className="font-medium"><strong>Year of Passing:</strong> {selectedAssessment.yearOfPassing}</p>
                    <p className="font-medium"><strong>Work Experience:</strong> {selectedAssessment.workExperience ? 'Yes' : 'No'}</p>
                    <p className="font-medium"><strong>Remarks:</strong> {selectedAssessment.remarks}</p>
                </div>
        
                {/* Document links */}
                <div className="mb-4">
                    <p className="font-medium"><strong>Resume:</strong> <a href={selectedAssessment.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View</a></p>
                    <p className="font-medium"><strong>English Test Scorecard:</strong> <a href={selectedAssessment.englishTestScorecard} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View</a></p>
                    <p className="font-medium"><strong>Academic Documents:</strong> <a href={selectedAssessment.acadmics} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View</a></p>
                    <p className="font-medium"><strong>English Test Document:</strong> <a href={selectedAssessment.englishTestDoc} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View</a></p>
                    <p className="font-medium"><strong>Work Experience Document:</strong> <a href={selectedAssessment.workExperienceDoc} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View</a></p>
                </div>
        
                <button
                    onClick={closeModal}
                    className="mt-4 bg-blue-500 text-white p-3 rounded-lg w-full transition duration-300 hover:bg-blue-600"
                >
                    Close
                </button>
            </div>
        </div>
            )}
        </div>
    );
}
