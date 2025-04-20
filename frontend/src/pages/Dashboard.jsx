import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"
import { updateProfile } from "../services/operations/authAPI";
import { fetchBalance, sendMoney } from "../services/operations/transactionAPI";
import { findUsers } from "../services/operations/transactionAPI";
import { IoClose } from "react-icons/io5";
export default function Dashboard() {
    const { user } = useSelector(state => state.profile);
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [balance, setBalance] = useState(0);
    
    const [filter, setFilter] = useState();
    const [users, setUsers] = useState([]);

    const [userToSend,setUserToSend]=useState("");
    const [showModal,setShowModal]=useState(false);
    const [amount,setAmount]=useState("");
    async function searchUsers() {
        let res = await findUsers(filter);
        console.log("USERS--",res);
        res=res.filter(x=>x._id!=user._id);
        setUsers(res);
    }
    function handleClick() {
        if (firstName == '' || lastName == '') { toast.error("Both Field Are Required"); return; }
        dispatch(updateProfile({ firstName, lastName }, token));
    }
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchBalance(token);
            setBalance(result);
        }
        fetchData();
    }, [])
    function handleSend(friend){
        setUserToSend(friend);
        setShowModal(true);
    }
    async function sendMoneyHandler(){
        const resp=await sendMoney(userToSend._id,amount,token);
        console.log("SNED MONEY",resp)
        
    }
    return (
        <div className="max-w-[1000px] mx-auto">
            {
                showModal&& 
                <div className="w-screen h-screen bg-yellow-200 fixed top-0 left-0 flex justify-center items-center">
                    <div className="absolute top-[10%] right-[20%] text-[30px] cursor-pointer"
                    onClick={()=>setShowModal(false)}><IoClose/> </div>
                    <div className="h-[350px] w-[450px] bg-white rounded-lg p-10">
                        <p className="text-[30px] font-bold">Send Money</p>
                        <p>{userToSend.firstName} {userToSend.lastName}</p>
                        <p className="font-semibold text-[20px] ">Amount</p>
                        <input onChange={e => setAmount(e.target.value)} 
                        className="w-full my-5  border-[2px] rounded-md p-1 py-2 outline-none "/>
                        <button className="bg-green-400 w-full py-2 rounded-md font-semibold text-white"
                        onClick={sendMoneyHandler}>Send Money</button>
                    </div>
                </div>
            }
            <p className="text-[35px] font-bold text-green-400 text-center ">Dashboard Page</p>
            <div>
                <p className="text-[30px] font-semibold">Name- {user?.firstName} {user?.lastName}</p>
                <p className="text-[30px] font-semibold">Balance- <span className="font-bold text-red-400">${balance.toFixed(2)}</span></p>
                <form className="flex gap-x-4">
                    <input type='text' onChange={e => setFirstName(e.target.value)} defaultValue={user.firstName}
                        className="border-[2px] border-blue-300 p-1 outline-none" required />
                    <input type='text' onChange={e => setLastName(e.target.value)} defaultValue={user.lastName}
                        className="border-[2px] border-blue-300 p-1 outline-none" required />
                    <button type="button" className="bg-yellow-300 font-semibold px-2 py-1 rounded-md"
                        onClick={handleClick}>Save Changes</button>
                </form>
                <p className="text-[25px] font-semibold my-2">Users</p>
                <div className="flex gap-x-4  ">
                    <input onChange={(e) => setFilter(e.target.value)} className="border-[2px] outline-none border-blue-300 p-1" 
                    placeholder="serach user"/>
                    <button onClick={searchUsers} className="bg-yellow-300 font-semibold px-2 py-1 rounded-md
                    ">Search</button>
                </div>
                <div className="flex flex-col gap-y-4 mt-5">
                    {
                        users.length > 0 && users.map((user) => (
                            <div key={user._id} className="flex justify-between">
                                <div className="flex gap-x-4 text-[20px] font-bold">
                                    <p className="">{user.firstName}</p>
                                    <p>{user.lastName}</p>
                                </div>
                                <button className="bg-black text-white font-semibold px-3 py-1 rounded-md bg-opacity-90"
                                onClick={()=>handleSend(user)}>Send Money</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}