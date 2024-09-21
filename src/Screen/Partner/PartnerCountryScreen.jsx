import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCountryFetchMutation } from '../../slices/adminApiSlice';
import { FetchCountry } from '../../slices/countrySlice';
import { ImInsertTemplate } from 'react-icons/im';

const countries = [
  {
    id: 1,
    logo: 'https://via.placeholder.com/50', // replace with actual logo url
    name: 'Germany',
    progressColor: 'bg-green-500',
    progressWidth: 'w-3/4',
    amount: '$245.30',
    deadline: 'May 15, 2024',
  },
  {
    id: 2,
    logo: 'https://via.placeholder.com/50',
    name: 'Canada',
    progressColor: 'bg-red-500',
    progressWidth: 'w-1/2',
    amount: '$138.00',
    deadline: 'April 12, 2024',
  },
  {
    id: 3,
    logo: 'https://via.placeholder.com/50',
    name: 'Australia',
    progressColor: 'bg-yellow-500',
    progressWidth: 'w-2/3',
    amount: '$77.99',
    deadline: 'July 1, 2024',
  },
  // Add more items as needed
];

const PartnerCountryScreen = () => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch()
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {countries} = useSelector(state=>state.country)
  
  const [CountryFetch, { isSuccess }] = useCountryFetchMutation();
  useEffect(() => {
    const fetchData = async () => {
        try {
            const result = await CountryFetch().unwrap();
            dispatch(FetchCountry(result));
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

  const paginatedCountries = countries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Country View</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Logo</th>
              <th className="px-4 py-2 text-left">Country Name</th>
              <th className="px-4 py-2 text-left">Bullet</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCountries.map((country) => (
              <tr key={country.id} className="border-t border-gray-200 hover:bg-gray-100">
                <td className="px-4 py-2">
                  <img src={country.flagURL} alt={country.name} className="w-12 h-12 rounded-full" />
                </td>
                <td className="px-4 py-2">{country.name}</td>
                <td className="px-4 py-2">
                  <div className="">
                    <div className='text-sm'>
                        {country.bullet}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
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
