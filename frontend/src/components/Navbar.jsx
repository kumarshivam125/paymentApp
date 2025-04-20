import { Link, useNavigate } from "react-router-dom";
import paytm from "../paytm-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/operations/authAPI";
export default function Navbar() {
    const {token}=useSelector(state=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    return (
        <div className="bg-gray-400 ">
            <div className="max-w-[1000px] mx-auto flex justify-between items-center">
                <Link to='/'><img src={paytm} className="bg-transparent w-[90px]" /></Link>
                {
                    !token &&
                    <div className="flex gap-x-2">
                        <Link to='/login'><button className="bg-yellow-300 font-semibold px-2 py-1 rounded-md">Login</button></Link>
                        <Link to='/signup'><button className="bg-yellow-300 font-semibold px-2 py-1 rounded-md">Signup</button></Link>
                    </div>
                }
                {
                    token &&
                    <div className="flex gap-x-2">
                        <button className="bg-yellow-300 font-semibold px-2 py-1 rounded-md" 
                        onClick={()=>dispatch(logout(navigate))}>Logout</button>
                        <Link to='/dashboard'><button className="bg-yellow-300 font-semibold px-2 py-1 rounded-md">Dashboard</button></Link>
                    </div>
                }
            </div>
        </div>
    )
}