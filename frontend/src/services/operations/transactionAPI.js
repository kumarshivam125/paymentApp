import axios from "axios";
import { apiConnector } from "../apiConnector";
import { FIND_USERS_API, TRANSFER_MONEY_API, USER_BALANCE_API } from "../apiEndpoints";
import toast from "react-hot-toast";

export async function findUsers(filter){
    const toastId=toast.loading("Loading..");
    let result=[];
    try{
        const {data}=await apiConnector("GET",FIND_USERS_API,null,null,{filter});
        console.log("FETCH USER API RESPONSE----",data)
        result=data.users;
    }
    catch(err){
        console.log("FETCH USER API ERROR----",err)
    }
    toast.dismiss(toastId);
    return result
}
export async function fetchBalance(token){
    const toastId=toast.loading("Loading..");
    let result=0;
    try{
        const {data}=await apiConnector("GET",USER_BALANCE_API,null,{Authorization:`Bearer ${token}`});
        console.log("FETCH BALANCE API RESPONSE--",data);
        result=data.balance
    }
    catch(err){
        console.log("Error in Fetching Balance",err)
    }
    toast.dismiss(toastId);
    return result;
}

export async function sendMoney(to,amount,token){
    const toastId=toast.loading("Loading..");
    try{
        const {data}=await apiConnector("POST",TRANSFER_MONEY_API,{to,amount},{Authorization:`Bearer ${token}`});
        console.log("SEND MONEY API RESPONSE--",data);
        toast.success("Money Sent");
        window.location.reload();
    }
    catch(err){
        toast.error("Cannot send Money "+ err?.response?.data?.message );
        // toast.error(<>Cannot send Money: <b>{err?.response?.data?.message}</b></>);
        console.log("Error in Sending Money",err)
    }
    toast.dismiss(toastId);
}

