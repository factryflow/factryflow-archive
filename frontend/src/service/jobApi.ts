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
        // getAllJobs Api 
        getAllJobs: builder.query<JobData[], void>({
            query: () => {
              return `/api/jobs/jobs-list/`;
            },
            transformResponse: (res: any) => {
                const data = res.data;
                const result = data.filter((item:any)=>item.is_deleted === false);
                return result
               
            },
            providesTags: ['getAllJobs']
          }),

        //   getJobbyId Api
          getJobById:builder.mutation({
            query:(id:number)=>{
                return{
                    url:`api/jobs/get-job-details/${id}/`,
                        
                }
            },
            transformResponse: (res: any) => res.data
        }),
        // create job api
          createJobs:builder.mutation({
            query:(body:any)=>{
                return {
                    url:'/api/jobs/create-job/',
                    method:'post',
                    body,
                }
            },
            invalidatesTags:['getAllJobs'],
    
        }),
        // delete Job Api
        deleteJobs:builder.mutation({
            query:(id:number)=>{
                return{
                    url:`api/jobs/delete-job/${id}/`,
                    method:'delete',
                }
            },
            invalidatesTags:['getAllJobs'],
        }),
        //update job Api
        updateJobs:builder.mutation({
            query:({id,data})=>{   
                return {
                    url:`api/jobs/update-jobs/${id}/`,
                    method:'put',
                    body:data,
                }
            },
            invalidatesTags:['getAllJobs'],
    
        })
    }),


})


export const {useGetAllJobsQuery,useCreateJobsMutation,useDeleteJobsMutation,useGetJobByIdMutation,useUpdateJobsMutation}= jobApi