import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const exceptionTypeApi = createApi({
    
    reducerPath:"exceptionTypeApi",
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
    tagTypes: ['getAllExceptionType'],
    endpoints:(builder)=>({
        // getAllExceptionType Api
        getAllExceptionType: builder.query<any[], void>({
            query: () => {
              return `api/operational-exception/get-type-list/`;
            },
            transformResponse: (res:  { data: any[] }) => {
                const data = res.data;
                const result = data.filter((item:any)=>item.is_deleted === false);
                return result
               
            },
            providesTags: ['getAllExceptionType']
          }),


        // create Exception Api
          createExceptionType:builder.mutation({
            query:(body:any)=>{
                return {
                    url:'api/operational-exception/create-type/',
                    method:'post',
                    body,
                }
            },
            invalidatesTags:['getAllExceptionType'],
    
        }),
        // delete Exception Api
        deleteExceptionType:builder.mutation({
            query:(id:number)=>{
                return{
                    url:`api/operational-exception/delete-type/${id}/`,
                    method:'delete',
                }
            },
            invalidatesTags:['getAllExceptionType'],
        }),
        //update Exception Api
        updateExceptionType:builder.mutation({
            query:({id,data})=>{   
                return {
                    url:`api/operational-exception/update-type/${id}/`,
                    method:'put',
                    body:data,
                }
            },
            invalidatesTags:['getAllExceptionType'],
    
        })
    }),


})


export const {
    useGetAllExceptionTypeQuery,
    useCreateExceptionTypeMutation,
    useDeleteExceptionTypeMutation,
    useUpdateExceptionTypeMutation,
}=exceptionTypeApi