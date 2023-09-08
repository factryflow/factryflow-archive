import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { GetAllJobType } from '../types/jobs.types';

export const dependencyApi = createApi({
    
    reducerPath:"dependencyApi",
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
    tagTypes: ['getAllDependencys'],
    endpoints:(builder)=>({
        // getAllTask Api 
        getAllDependencys: builder.query<any[], void>({
            query: () => {
              return `api/dependency/get-dependency-list/`;
            },
            transformResponse: (res:  { data: any[] }) => {
                const data = res.data;
                const result = data.filter((item:any)=>item.is_deleted === false);
                return result
               
            },
            providesTags: ['getAllDependencys']
          }),

        //   getJobbyId Api
        //   getJobById:builder.mutation({
        //     query:(id:number)=>{
        //         return{
        //             url:`api/jobs/get-job-details/${id}/`,
                        
        //         }
        //     },
        //     transformResponse: (res: any) => res.data
        // }),

        // create Task api
        //   createTasks:builder.mutation({
        //     query:(body:any)=>{
        //         return {
        //             url:'api/tasks/create-task/',
        //             method:'post',
        //             body,
        //         }
        //     },
        //     invalidatesTags:['getAllDependencys'],
    
        // }),
        // delete Job Api
        // deleteTasks:builder.mutation({
        //     query:(id:number)=>{
        //         return{
        //             url:`api/tasks/delete-task/${id}/`,
        //             method:'delete',
        //         }
        //     },
        //     invalidatesTags:['getAllDependencys'],
        // }),
        //update job Api
        // updateTasks:builder.mutation({
        //     query:({id,data})=>{   
        //         return {
        //             url:`api/tasks/update-tasks/${id}/`,
        //             method:'put',
        //             body:data,
        //         }
        //     },
        //     invalidatesTags:['getAllDependencys'],
    
        // })
    }),


})


export const {
    useGetAllDependencysQuery,
    // useCreateTasksMutation,
    // useDeleteTasksMutation,
    // useUpdateTasksMutation,
    // useDeleteJobsMutation,
    // useGetJobByIdMutation,
    // useUpdateJobsMutation
}=dependencyApi