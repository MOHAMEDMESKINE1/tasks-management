import { faDashboard, faHome, faPencilSquare, faSignOut, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link,useLocation } from "react-router-dom";
import styles from "../../helpers/styles";
import AuthUser from "../../auth/AuthUser";
const DashbaordLayout = ({ children }) => {

    const location = useLocation();
    const {token,logout} = AuthUser();
   
    const logoutUser = () => {
        if(token != undefined){
            logout();
        }
    }
    const activeLinkStyle = {
        backgroundColor: 'lightgray',
        color: 'white'
      };
    return ( <>
             <div class="container-fluid mx-auto ">
                <div class="row  ">
                    <div class=" col-md-2   bg-dark">
                        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                           
                            <ul style={styles.fontSize} class="nav  fw-bold my-5 flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                               <li className="nav-item">
                                <Link to="/" style={styles.backgroundColor} class="text-white   nav-link   my-3  align-middle px-0">
                                        <FontAwesomeIcon className="mx-2" icon={ faHome}/> Home
                                </Link>
                               </li>
                                <li class="nav-item "  >
                                    <Link  to="/dashboard" style={styles.backgroundColor}   className={`text-white  nav-link  my-3 ${ location.pathname==='/' ? activeLinkStyle.backgroundColor : ''}  align-middle px-0`}>
                                        <FontAwesomeIcon className="mx-2" icon={ faDashboard}/> Dashboard
                                    </Link>
                                </li>
                                <li class="nav-item">
                                    <Link  to="/tasks" style={styles.backgroundColor} className={`text-white  nav-link  my-3 ${ location.pathname==='/tasks' ? activeLinkStyle.backgroundColor : ''}  align-middle px-0`}>
                                        <FontAwesomeIcon className="mx-2" icon={ faTasks}/> Tasks
                                    </Link>
                                </li>                              
                                <li>
                                    <Link to="/tasks/create" style={styles.backgroundColor} className={`text-white  nav-link  my-3 ${ location.pathname==='/tasks/create' ? activeLinkStyle.backgroundColor : ''}  align-middle px-0`}>
                                        <FontAwesomeIcon className="mx-2" icon={ faPencilSquare}/> Create Task
                                    </Link>
                                </li>
                              
                                <li>
                                    <span  onClick={logoutUser}  style={styles.backgroundColor}  className={`text-white  nav-link  my-3  align-middle px-0`}>
                                        <FontAwesomeIcon className="mx-2" icon={ faSignOut}/> Logout
                                    </span>
                                </li>
                              
                            </ul>
                            <hr/>
                           
                        </div>
                    </div>
                    {/* content */}
                    <div class="col-10 py-3">
                       {children}
                    </div>
                     {/* content */}
                   
                </div>
                
            </div>
            <footer class="bg-dark text-center fw-bold d-flex  justify-content-center align-items-center  text-white text-lg-start">
                   
                   <div class="text-center p-3" >
                       @{new Date().getFullYear()}
                       <span class="mx-2 ">Tasks Management</span>
                   </div>
                   
               </footer>
    </> );
}
 
export default DashbaordLayout;