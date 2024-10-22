import React, { useEffect, useState } from 'react';
import { useGetPartnerUploadMutation } from '../../slices/adminApiSlice';

export default function PartnerUsefulInformationScreen() {
  const [GetPartnerUpload] = useGetPartnerUploadMutation();
  const [partnerData, setPartnerData] = useState([]);

  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        const response = await GetPartnerUpload().unwrap();
        setPartnerData(response); // Assuming response is an array of objects
      } catch (error) {
        console.error('Error fetching partner data', error);
      }
    };

    fetchPartnerData();
  }, [GetPartnerUpload]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Partner Useful Information</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left font-medium tracking-wider">Title</th>
              <th className="py-3 px-6 text-left font-medium tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {partnerData?.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                <td className="py-4 px-6 flex items-center text-gray-700">
                  {item.iconURL && (
                    <img
                      src={item.iconURL}
                      alt="Icon"
                      className="h-8 w-8 mr-3 rounded-full shadow"
                    />
                  )}
                  <span className="font-medium">{item.title}</span>
                </td>
                <td className="py-4 px-6">
                  {item.imageURL && (
                    <a
                      href={item.imageURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition duration-200"
                    >
                      View
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
