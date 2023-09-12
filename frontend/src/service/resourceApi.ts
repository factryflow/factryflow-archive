import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { GetAllJobType } from '../types/jobs.types';

export const resourceApi = createApi({
    
    reducerPath:"resourceApi",
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
    tagTypes: ['getAllResource'],
    endpoints:(builder)=>({
        // getAllDependency Api
        // getAllDependencys: builder.query<any[], void>({
        //     query: () => {
        //       return `api/dependency/get-dependency-list/`;
        //     },
        //     transformResponse: (res:  { data: any[] }) => {
        //         const data = res.data;
        //         const result = data.filter((item:any)=>item.is_deleted === false);
        //         return result
               
        //     },
        //     providesTags: ['getAllDependencys']
        //   }),

        //   getJobbyId Api
        //   getJobById:builder.mutation({
        //     query:(id:number)=>{
        //         return{
        //             url:`api/jobs/get-job-details/${id}/`,
                        
        //         }
        //     },
        //     transformResponse: (res: any) => res.data
        // }),

        // create Dependency Api
          createresource:builder.mutation({
            query:(body:any)=>{
                return {
                    url:'api/dependency/create-dependency/',
                    method:'post',
                    body,
                }
            },
            // invalidatesTags:['getAllDependencys'],
    
        }),
        // delete Dependency Api
        // deleteDependency:builder.mutation({
        //     query:(id:number)=>{
        //         return{
        //             url:`api/dependency/delete-dependency/${id}/`,
        //             method:'delete',
        //         }
        //     },
        //     invalidatesTags:['getAllDependencys'],
        // }),
        //update Dependency Api
        // updateDependency:builder.mutation({
        //     query:({id,data})=>{   
        //         return {
        //             url:`api/dependency/update-dependency/${id}/`,
        //             method:'put',
        //             body:data,
        //         }
        //     },
        //     invalidatesTags:['getAllDependencys'],
    
        // })
    }),


})


export const {
     useCreateresourceMutation,
 
    // useUpdateTasksMutation,
    // useDeleteJobsMutation,
    // useGetJobByIdMutation,
    // useUpdateJobsMutation
}=resourceApi