import React, { useEffect, useState } from 'react';
import { useGetAssessmentByUserMutation } from '../../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssessment } from '../../slices/assessmentSlice';
import { FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function PartnerAssessmentView() {
    const [GetAssessmentByUser, { isSuccess, isLoading, error }] = useGetAssessmentByUserMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const { assessment } = useSelector((state) => state.assessment);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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

    // Pagination Logic
    const totalPages = Math.ceil(assessment?.length / rowsPerPage);
    const currentStudents = assessment?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

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

            {/* Rows Per Page Selector */}
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
            </div>

            {/* Student Table */}
            {currentStudents && currentStudents.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-3 px-4 border-b">Created By</th>
                            <th className="py-3 px-4 border-b">First Name</th>
                            <th className="py-3 px-4 border-b">Last Name</th>
                            <th className="py-3 px-4 border-b">Email</th>
                            <th className="py-3 px-4 border-b">DOB</th>
                            <th className="py-3 px-4 border-b">Tracking ID</th>
                             <th className="py-3 px-4 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents?.map((std, index) => (
                            <tr key={index} className="hover:bg-gray-100 transition duration-200">
                                <td className="py-3 px-4 border-b">{std.User?.name || "N/A"}</td>
                                <td className="py-3 px-4 border-b">{std.firstName}</td>
                                <td className="py-3 px-4 border-b">{std.lastName}</td>
                                <td className="py-3 px-4 border-b">{std.emailID || "N/A"}</td>
                                <td className="py-3 px-4 border-b">{std.dob}</td>
                                <td className="py-3 px-4 border-b">{std.trackingId}</td>
                                <td className="py-3 px-4 border-b">{std.status}</td>
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
