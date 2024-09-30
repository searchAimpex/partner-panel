import React, { useEffect } from 'react';
import { useGetStudentByUserMutation } from '../../slices/adminApiSlice';
import { fetchStudent } from '../../slices/studentSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

export default function PartnerViewStudent() {
    const [GetStudentByUser] = useGetStudentByUserMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const { student } = useSelector((state) => state.student);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = userInfo._id;
                const res = await GetStudentByUser(data);
                console.log("++++>res", res);
                dispatch(fetchStudent(res.data));
            } catch (error) {
                console.log("Failed to fetch student", error);
                toast.error("Failed to fetch student data");
            }
        };

        fetchData();
    }, [GetStudentByUser, userInfo._id, dispatch]);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Student Information</h2>
            {student && student.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-3 px-4 border-b">First Name</th>
                            <th className="py-3 px-4 border-b">Last Name</th>
                            <th className="py-3 px-4 border-b">Email</th>
                            <th className="py-3 px-4 border-b">DOB</th>
                            <th className="py-3 px-4 border-b">Address</th>
                            <th className="py-3 px-4 border-b">State</th>
                            <th className="py-3 px-4 border-b">Country</th>
                            <th className="py-3 px-4 border-b">Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {student.map((std, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-3 px-4 border-b">{std.firstName}</td>
                                <td className="py-3 px-4 border-b">{std.lastName}</td>
                                <td className="py-3 px-4 border-b">{std.emailID || "N/A"}</td>
                                <td className="py-3 px-4 border-b">{std.dob}</td>
                                <td className="py-3 px-4 border-b">{std.address}</td>
                                <td className="py-3 px-4 border-b">{std.state}</td>
                                <td className="py-3 px-4 border-b">{std.country}</td>
                                <td className="py-3 px-4 border-b">{std.status}</td>

                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600">No student data available.</p>
            )}
        </div>
    );
}
