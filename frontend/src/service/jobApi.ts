import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// const user = JSON.parse(localStorage.getItem("user") || "{}");
// console.log(user,"userdata")

interface JobData {
    id: Number;
    name: string;
    priority: Number;
    due_date: Date;
    customer: string;
    description: string;
  }

export const jobApi = createApi({
    
    reducerPath:"jobApi",
    baseQuery:fetchBaseQuery({
        // baseUrl:" http://127.0.0.1:8000/"
        baseUrl:import.meta.env.VITE_API_ENDPOINT,
        prepareHeaders:(header)=>{
            header.set(
                'Authorization',
                `Bearer ${localStorage.getItem("token")}`
            )
        }
    }),
    tagTypes: ['getAllJobs'],
    endpoints:(builder)=>({
        getAllJobs: builder.query<JobData[], void>({
            query: () => {
              return `/api/jobs/jobs-list/`;
            },
            transformResponse: (res: any) => res.data,
            providesTags: ['getAllJobs'],
            // transformResponse: (res: any) => res.data
          })
    }),


})


export const {useGetAllJobsQuery}= jobApi