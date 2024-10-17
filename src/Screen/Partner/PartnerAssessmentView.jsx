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

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Assessment Information</h2>

            {/* Loading State */}
            {isLoading && <p className="text-gray-600">Loading data...</p>}
            {error && <p className="text-red-600">Error fetching data: {error.message}</p>}

            {/* Filters */}
            <div className="flex justify-between items-center mb-4">
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

                {/* Name Search */}
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
                            <tr key={index} className="hover:bg-gray-100 transition duration-200">
                                <td className="py-3 px-4 border-b">{std.createdAt.split("T")[0]}</td>
                                <td className="py-3 px-4 border-b">{std.firstName} {std.lastName}</td>
                                <td className="py-3 px-4 border-b">{std.emailID || "N/A"}</td>
                                <td className="py-3 px-4 border-b">{std.mobileNumber}</td>
                                <td className="py-3 px-4 border-b">{std?.Country?.name}</td>
                                <td className="py-3 px-4 border-b">{std.Course}</td>
                                <td className="py-3 px-4 border-b">{std.status}</td>
                                <td className="py-3 px-4 border-b">
                                    <EyeIcon />
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
        </div>
    );
}
