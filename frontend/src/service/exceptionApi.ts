import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const exceptionApi = createApi({
    
    reducerPath:"exceptionApi",
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
    tagTypes: ['getAllException'],
    endpoints:(builder)=>({
        // getAllException Api
        getAllException: builder.query<any[], void>({
            query: () => {
              return `api/operational-exception/get-exception-list/`;
            },
            transformResponse: (res:  { data: any[] }) => {
                const data = res.data;
                const result = data.filter((item:any)=>item.is_deleted === false);
                return result
               
            },
            providesTags: ['getAllException']
          }),


        // create Exception Api
          createException:builder.mutation({
            query:(body:any)=>{
                return {
                    url:'api/operational-exception/create-exception/',
                    method:'post',
                    body,
                }
            },
            invalidatesTags:['getAllException'],
    
        }),
        // delete Exception Api
        deleteException:builder.mutation({
            query:(id:number)=>{
                return{
                    url:`api/operational-exception/delete-exception/${id}/`,
                    method:'delete',
                }
            },
            invalidatesTags:['getAllException'],
        }),
        //update Exception Api
        updateException:builder.mutation({
            query:({id,data})=>{   
                return {
                    url:`api/operational-exception/update-exception/${id}/`,
                    method:'put',
                    body:data,
                }
            },
            invalidatesTags:['getAllException'],
    
        })
    }),


})


export const {
    useGetAllExceptionQuery,
    useCreateExceptionMutation,
    useDeleteExceptionMutation,
    useUpdateExceptionMutation
}=exceptionApi