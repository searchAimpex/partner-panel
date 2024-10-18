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
        CreateStudent:builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/student`,
                method: 'POST',
                body:data
            }),
        }),
        GetStudentByUser: builder.mutation({
            query:(id)=>({
                url: `${USERS_URL}/student/${id}`,
                method: 'GET',
            }),
        }),
        FetchOneStudent: builder.mutation({
            query:(id)=>({
                url: `${USERS_URL}/student/one/${id}`,
                method: 'GET',
            }),
        }),
        FetchOneStudentByTrackingID: builder.mutation({
            query:(id)=>({
                url: `${USERS_URL}/student/track/${id}`,
                method: 'GET',
            }),
        }),
        CreateTicket : builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/ticket`,
                method: 'POST',
                body: data
            }),
        }),

        GetOneTicket : builder.mutation({ 
            query:(id)=>({
                url: `${USERS_URL}/ticket/${id}`,
                method: 'GET',
            }),
        }),
        CreateResponseTicket:builder.mutation({
            query: (data)=> ({
                url:`${USERS_URL}/ticket/reply/${data.id}`,
                method: 'POST',
                body:data.raw
            
            }),
        }),
        StudentMatrix :builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/matrix/${data}`,
                method: 'GET',
            }),
        }),
        GetAllPromotional: builder.mutation({
            query: () => ({
              url: `${USERS_URL}/FetchAllPromotional`,
              method: 'GET',

            }),
          }),
        CreateAssessment: builder.mutation({
            query: (data)=> ({
                url: `${USERS_URL}/profile`,
                method: 'POST',
                body: data
            }),
        }),
        GetAssessmentByUser: builder.mutation({
            query:(id)=>({
                url: `${USERS_URL}/profile/${id}`,
                method: 'GET',
            }),
        }),
        GetMyPopup: builder.mutation({
            query:(id)=>({
                url: `${USERS_URL}/popup`,
                method: 'GET',
            }),
        }),
    })

});

export const {useCountryFetchMutation,useFetchUniversityMutation,useAllCourseMutation,useFetchProvinceMutation,
    useAddUserMutation,useFetchUserMutation,useFetchNotifcationMutation,useFetchOneUniversityMutation,
    useCreateStudentMutation,useGetStudentByUserMutation,useFetchOneStudentMutation,
    useFetchOneStudentByTrackingIDMutation,useCreateTicketMutation,useGetOneTicketMutation ,useCreateResponseTicketMutation,
    useStudentMatrixMutation,useGetAllPromotionalMutation,useCreateAssessmentMutation,useGetAssessmentByUserMutation,
    useGetMyPopupMutation
} = userApiSlice