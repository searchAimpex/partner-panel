import React, { useEffect, useState } from 'react';
import { useGetCommissionUploadMutation } from '../../slices/adminApiSlice';
import { toast } from 'react-toastify';

export default function PartnerCommissionScreen() {
  const [GetCommissionUpload] = useGetCommissionUploadMutation();
  const [commissions, setCommissions] = useState([]);

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const response = await GetCommissionUpload().unwrap();
        setCommissions(response); // Assuming response is an array of commission objects
      } catch (error) {
        console.error('Error fetching commissions:', error);
        toast.error('Failed to fetch commissions.');
      }
    };

    fetchCommissions();
  }, [GetCommissionUpload]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Partner Commissions</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="py-4 px-6 border-b border-gray-300 text-left">Country</th>
            <th className="py-4 px-6 border-b border-gray-300 text-left">Title</th>
            <th className="py-4 px-6 border-b border-gray-300 text-left">File URL</th>
            <th className="py-4 px-6 border-b border-gray-300 text-left">Date Created</th>
          </tr>
        </thead>
        <tbody>
          {commissions.map((commission) => (
            <tr
              key={commission._id}
              className="hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              <td className="py-4 px-6 border-b border-gray-300 flex items-center">
                {commission.SecondCountry?.flagURL && (
                  <img
                    src={commission.SecondCountry.flagURL}
                    alt="Flag"
                    className="w-8 h-5 mr-2"
                  />
                )}
                {commission.SecondCountry?.name || 'N/A'}
              </td>
              <td className="py-4 px-6 border-b border-gray-300">{commission.title}</td>
              <td className="py-4 px-6 border-b border-gray-300">
                <a
                  href={commission.fileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View File
                </a>
              </td>
              <td className="py-4 px-6 border-b border-gray-300 text-center">
                {new Date(commission.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
