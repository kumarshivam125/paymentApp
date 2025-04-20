import './App.css'
import {Route,Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Signup from "../src/pages/Signup";
import Home from "../src/pages/Home";
import Navbar from "../src/components/Navbar";
import Dashboard from "../src/pages/Dashboard";
import {Toaster} from "react-hot-toast";
import {PrivateRoute} from "./components/PrivateRoute";
import  OpenRoute from './components/OpenRoute';

function App() {
  return (
    <div className="">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<OpenRoute> <LoginPage/> </OpenRoute> }/>
          <Route path='/signup' element={<OpenRoute> <Signup/> </OpenRoute> }/>
          <Route path='/dashboard' element={<PrivateRoute> <Dashboard/> </PrivateRoute> }/>
        </Routes>
        <Toaster/>
    </div>      
  )
}

export default App
// username,password,firstName,lastName