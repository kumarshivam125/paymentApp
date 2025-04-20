import { createSlice } from "@reduxjs/toolkit";

const initialState={
    token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
    loading:false,
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
    }
})
export const {setToken,setLoading}=authSlice.actions;
export default authSlice.reducer;