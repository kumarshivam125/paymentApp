import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";

import {useForm} from "react-hook-form";
import { Login } from "../services/operations/authAPI";

export default function LoginPage(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {register,reset,handleSubmit}=useForm();
    async function mySubmit(data){
        console.log("DATA",data);
        dispatch(Login(data,navigate));
    }
    return(
        <div className="max-w-[1000px] mx-auto">
            <p className="my-4 font-semibold text-[30px] ">Login page</p>
            <form className="space-y-3" onSubmit={handleSubmit(mySubmit)}>
                <div className="flex gap-x-2 items-center">
                    <p>Enter Username</p>
                    <input type="text" className="bg-gray-400 rounded-md px-3 py-2" 
                    {...register("username",{required:true})}/>
                </div>
                <div className="flex gap-x-2 items-center">
                    <p>Enter Password</p>
                    <input type="text" className="bg-gray-400 rounded-md px-3 py-2"
                        {...register("password",{required:true})}/>
                </div>
                <button className="bg-yellow-300 font-semibold px-2 py-1 rounded-md">Login In</button>
            </form>
        </div>
    )
}