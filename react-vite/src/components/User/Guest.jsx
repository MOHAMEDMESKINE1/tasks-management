import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "../Home";
import Register from "./Register";
import NotFound from "../NotFound";
import LayoutNavbar from "../layouts/LayoutNavbar";

const Guest = () => {
    
    
    return ( <>
        <LayoutNavbar>
                <li class="nav-item">
                    <Link  class="nav-link" to="/">Home</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/login">Login</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/register">Register</Link>
                </li>

        </LayoutNavbar>
        
                <Routes>
                    <Route  path='/' element={<Home/>}/>
                    <Route  path='/login' element={<Login/>}/>
                    <Route  path='/register' element={<Register/>}/>
                    <Route  path='*' element={<NotFound/>}/>
                </Routes>
          
    
    </> );
}
 
export default Guest;