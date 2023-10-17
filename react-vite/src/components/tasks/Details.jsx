import { useParams } from "react-router-dom";
import DashbaordLayout from "../layouts/DashboardLayout";
import Api from "../../helpers/Api";
import { useEffect, useState } from "react";
import Done from "../Done";

export default function Details() {

  const {id} =useParams();
  const  [task,setTask] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

    const taskDetails = () => {
      Api.get(`tasks/show/${id}`).then(response=>{
        console.log(response.data);
        setTask(response.data)
       }).catch(err => console.log(err))

    }
    useEffect(()=>{
      taskDetails();
      
      setTimeout(() => {
        setIsLoading(false)
    }, 500);

    },[])

  return (
        <>
             <DashbaordLayout>
                  {
                    isLoading ? <div className="d-flex justify-content-center">
                                    <button class="btn btn-success" type="button" disabled>
                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Loading...
                                    </button> 
                                </div>
                    :
                    <>
                          <div class="card border-secondary m-5">
                      <div class="card-body">
                          
                              Task : <Done task={task?.done}/>
                        
                              Category : <span class="badge mx-1 text-bg-success"> {task?.category.name} </span> 
                         
                              <div>
                              <h3  class="card-title text-primary  my-2 fw-bold text-uppercase ">{task?.title || 'TITLE'}</h3>
                                          <p className="lead">
                                              {task?.body}
                                          </p>
                              </div>
                       
                           
                            <div className="d-flex justify-content-end ">
                                <small className="p-1 bg-secondary  text-white rounded">Created at : {task?.created_at}</small>
                            </div>
                      </div>
                    </div>
                    </>
                  }

                    
            </DashbaordLayout>
        
        </>
  )
}
