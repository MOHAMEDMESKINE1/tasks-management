import { useEffect, useState } from "react";
import AuthUser from "../auth/AuthUser";
import DashbaordLayout from "./layouts/DashboardLayout";
import Charts from "../charts/Charts";

const Dashboard = () => {
    const {http} = AuthUser()
    const [userDetail,setUserDetail] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserDetails = () => {
        http.post('/authenticated').then(response => setUserDetail(response.data))
    }
    useEffect(()=>{
  
        fetchUserDetails();
        setTimeout(() => {
            setIsLoading(false)
        }, 500);
    },[])
    return ( <>
        

            <DashbaordLayout>

               {
                isLoading ? 
                <div className="d-flex justify-content-center">
                    <button class="btn btn-success" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                    </button> 
                </div>
                :
                <>
                 <div className="container">
                        {
                                userDetail && 
                                
                                <div className="text-primary m-5">
                                    
                                    <ul class="list-group">
                                        <li class="list-group-item d-flex justify-content-between align-items-center active">
                                            USER:  {userDetail?.name } 
                                            <span class="badge bg-success badge-pill">ID: {userDetail?.id}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            EMAIL : {userDetail?.email }
                                            <span class="badge bg-secondary badge-pill">Date: {new Date(userDetail?.created_at).toLocaleDateString()}</span>
                                        </li>
                                        
                                    </ul>
                                </div>
                                
                            }
                </div>
                <Charts/>
                </>
               }
                
            </DashbaordLayout>
    </> );
}
 
export default Dashboard;