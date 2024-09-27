import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useCountryGetMutation } from '../../slices/userApiSlice';
import { FetchSecondCountry } from '../../slices/secondCountrySlice';
import { toast } from 'react-toastify';

const PartnerCountryScreen = () => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { countries } = useSelector((state) => state.SecondCountry);
  const [CountryFetch] = useCountryGetMutation();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await CountryFetch().unwrap();
        dispatch(FetchSecondCountry(result));
      } catch (error) {
        toast.error('Something went wrong while fetching the countries.');
      }
    };
    fetchData();
  }, [CountryFetch, dispatch]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedCountries = countries.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Country View</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Logo</th>
              <th className="px-4 py-2 text-left">Country Name</th>
              <th className="px-4 py-2 text-left">Currency</th>
              <th className="px-4 py-2 text-left">Country Code</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCountries.map((country) => (
              <tr
                key={country.id}
                className="border-t border-gray-200 hover:bg-gray-100"
              >
                <td className="px-4 py-2">
                  <img
                    src={country.flagURL}
                    alt={country.name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="px-4 py-2">{country.name}</td>
                <td className="px-4 py-2">{country.currency}</td>
                <td className="px-4 py-2">{country.code}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => navigate(`/partner/country/${country._id}`)} // Navigate on click
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <select
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          className="border border-gray-300 rounded p-1"
        >
          <option value={3}>3 rows per page</option>
          <option value={5}>5 rows per page</option>
          <option value={10}>10 rows per page</option>
          <option value={25}>25 rows per page</option>
        </select>
        <div className="flex space-x-2">
          <button
            onClick={() => handleChangePage(Math.max(page - 1, 0))}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
            disabled={page === 0}
          >
            Prev
          </button>
          <button
            onClick={() => handleChangePage(page + 1)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
            disabled={page >= Math.ceil(countries.length / rowsPerPage) - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerCountryScreen;
