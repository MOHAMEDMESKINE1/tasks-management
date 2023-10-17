import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard";
import Home from "../Home";
import NotFound from "../NotFound";
import Tasks from "../tasks/Tasks";
import CreateTask from "../tasks/CreateTask";
import EditTask from "../tasks/EditTask";
import { useEffect, useState } from "react";
import AuthUser from "../../auth/AuthUser";
import LayoutNavbar from "../layouts/LayoutNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser } from "@fortawesome/free-solid-svg-icons";
import Details from "../tasks/Details";
import styles from "../../helpers/styles";

const Auth = () => {

    const {http} = AuthUser()
    const [userDetail,setUserDetail] = useState('');

    const fetchUserDetails = () => {
        http.post('/authenticated').then(response => setUserDetail(response.data))
    }

    const {token,logout} = AuthUser();
   
    const logoutUser = () => {
        if(token != undefined){

            logout();

        }
    }
    

    useEffect(()=>{
        fetchUserDetails();
    },[])

   
    return ( <>
      
            <LayoutNavbar>
                    <li className="nav-item ">
                        <li className="nav-link  text-center text-warning" style={styles.backgroundColor}> 
                        <span><FontAwesomeIcon className="" icon={faUser}/> {userDetail && userDetail.name}</span>
                            
                        </li>
                    </li>
                    <li class="nav-item mx-2 text-center" >
                        <Link className="nav-link" to="/dashboard">Dashbaord</Link>
                    </li>
                    <li className="nav-item mx-2 text-center" >
                        <span role="button" onClick={logoutUser} class="nav-link">Log Out</span>
                    </li>

            </LayoutNavbar>
             
           <Routes>
             
                <Route  path='/' element={<Home/>}/>
                <Route  path='/tasks' element={<Tasks/>}/>
                <Route  path='/tasks/create' element={<CreateTask/>}/>
                <Route  path='/tasks/edit/:id' element={<EditTask/>}/>
                <Route  path='/tasks/details/:id' element={<Details/>}/>
                <Route  path='/dashboard' element={<Dashboard/>}/>
                <Route  path='*' element={<NotFound/>}/>

            </Routes>
         
           
    
    </> );
}
 
export default Auth;