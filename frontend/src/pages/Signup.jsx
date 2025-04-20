import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";

import {useForm} from "react-hook-form";
import { SignUp } from "../services/operations/authAPI";

export default function Signup(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {register,reset,handleSubmit}=useForm();
    async function mySubmit(data){
        console.log("DATA",data);
        dispatch(SignUp(data,navigate));
    }
    return(
        <div className="max-w-[1000px] mx-auto">
            <p className="my-4 font-semibold text-[30px] ">Signup page</p>
            <form className="space-y-3" onSubmit={handleSubmit(mySubmit)}>
                <div className="flex gap-x-2 items-center">
                    <p>Enter First Name</p>
                    <input type="text" className="bg-gray-400 rounded-md px-3 py-2" 
                    {...register("firstName",{required:true})}/>
                </div>
                <div className="flex gap-x-2 items-center">
                    <p>Enter Last Name</p>
                    <input type="text" className="bg-gray-400 rounded-md px-3 py-2"
                        {...register("lastName",{required:true})}/>
                </div>
                <div className="flex gap-x-2 items-center">
                    <p>Enter User Name</p>
                    <input type="text" className="bg-gray-400 rounded-md px-3 py-2"
                        {...register("username",{required:true})}/>
                </div>
                <div className="flex gap-x-2 items-center">
                    <p>Enter Password</p>
                    <input type="text" className="bg-gray-400 rounded-md px-3 py-2"
                        {...register("password",{required:true})}/>
                </div>
                <button className="bg-yellow-300 font-semibold px-2 py-1 rounded-md">Sign Up</button>
            </form>
        </div>
    )
}