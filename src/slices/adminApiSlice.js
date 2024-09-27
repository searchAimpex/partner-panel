import { apiSlice } from './apiSlice';
const USERS_URL = '/api/admin';


export const userApiSlice = apiSlice.injectEndpoints({ 
    endpoints: (builder) => ({
        CountryFetch:builder.mutation({
            query:()=>({
                url: `${USERS_URL}/countries`,
                method: 'GET',
            }),
        }),
        FetchProvince:builder.mutation({
            query:()=>({
                url: `${USERS_URL}/province`,
                method: 'GET',
            }),
        }),
        FetchUniversity:builder.mutation({
            query:()=>({
                url: `${USERS_URL}/university`,
                method: 'GET',
            }),
        }),
        AllCourse: builder.mutation({
            query:(filter)=>({
                url: `${USERS_URL}/course/All`,
                method: 'GET',
                params: filter
            }),
        }),
        AddUser:builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/extrauser`,
                method: 'POST',
                body: data
            }),
        }),
        FetchUser:builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/extrauser/${data}`,
                method: 'GET',
            }),
        }),
        fetchNotifcation:builder.mutation({
            query: (data)=> ({
                url:`${USERS_URL}/notify-me/${data}`,
                method: 'GET'
            }),
        }),
        FetchOneUniversity:builder.mutation({
            query:(id)=>({
                url: `${USERS_URL}/university/${id}`,
                method: 'GET',
            }),
        }),


    })

});

export const {useCountryFetchMutation,useFetchUniversityMutation,useAllCourseMutation,useFetchProvinceMutation,
    useAddUserMutation,useFetchUserMutation,useFetchNotifcationMutation,useFetchOneUniversityMutation
} = userApiSlice