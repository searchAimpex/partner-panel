import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://searchmystudy.com/' });

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});
