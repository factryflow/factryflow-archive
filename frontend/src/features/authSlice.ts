import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface AuthState {
 
    token : string| null;
}

const initialState : AuthState ={
    
    token:null,
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser :(state,action:PayloadAction<{ token:string}>)=>{
            // localStorage.setItem("user",JSON.stringify({
            //     name:action.payload.name,
            //     token:action.payload.token
            // }))
            localStorage.setItem("token", action.payload.token)
            // state.name= action.payload.name;
            state.token= action.payload.token;
        },
        logout:(state) =>{
            localStorage.clear();
            // state.name=null;
            state.token=null;
        }
    }
})


export const selectAuth = (state:RootState) => state.auth;
export const {setUser,logout} =   authSlice.actions;
export default authSlice.reducer;