import toast from "react-hot-toast";
import {setLoading, setToken} from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { LOGIN_API, SIGNUP_API, UPDATE_PROFILE_API } from "../apiEndpoints";
import { setUser } from "../../slices/profileSlice";

export function SignUp(data,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("loading..");
        dispatch(setLoading(true));
        try{
            const resp=await apiConnector("POST",SIGNUP_API,data);
            console.log("SIGNUP API RESPONSE.......",resp);
            if(!resp.data.success)
                throw new Error(resp?.data?.message);

            toast.success("Account Created")
            navigate("/login");
        }
        catch(err){
            toast.error("Sign Up failed "+err?.response?.data?.message)
            console.log("SIGNUP API ERROR.......",err);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
export function Login(data,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("loading..");
        dispatch(setLoading(true));
        try{
            const resp=await apiConnector("POST",LOGIN_API,data);
            console.log("LOGIN API RESPONSE.......",resp);
            if(!resp.data.success)
                throw new Error(resp?.data?.message);

            toast.success("Login Successfully");
            dispatch(setToken(resp.data.token));
            dispatch(setUser(resp.data.userData));
            localStorage.setItem("token",JSON.stringify(resp.data.token));
            localStorage.setItem("user",JSON.stringify(resp.data.userData));
            navigate("/dashboard");
        }
        catch(err){
            toast.error("Login failed "+err?.response?.data?.message)
            console.log("LOGIN API ERROR.......",err);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function updateProfile(data,token){
    return async(dispatch)=>{
        const toastId=toast.loading("loading..");
        dispatch(setLoading(true));
        try{
            const resp=await apiConnector("POST",UPDATE_PROFILE_API,data,{Authorization:`Bearer ${token}`});
            console.log("UPDATE API RESPONSE.......",resp);
            if(!resp.data.success)
                throw new Error(resp?.data?.message);

            toast.success("Profile Updated Successfully");
            dispatch(setUser(resp.data.updatedUser));
            localStorage.setItem("user",JSON.stringify(resp.data.updatedUser));
            window.location.reload();
        }
        catch(err){
            toast.error("Update Profile failed "+err?.response?.data?.message)
            console.log("UPDATE PROFILE API ERROR.......",err);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function logout(navigate){
    return (dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/");
    }
}