import { faArrowCircleDown, faArrowCircleUp, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import DashbaordLayout from "../layouts/DashboardLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import styles from "../../helpers/styles.js";
import { useEffect, useState } from "react";
import Api from "../../helpers/Api";
import Pagination from "react-js-pagination";
import useCategories from "../hook/useCategories";
import { useDebounce } from "use-debounce";
import Card from "../layouts/Card";
import TableTask from "./TableTask";
import * as xlsx from "xlsx";
import ExcelExport from "../../ExcelExport/ExcelExport";
const Tasks = () => {

   const [tasks,setTasks] = useState([]);
   const [categories,setCategories] = useState([]);
   const [isExporting,setIsExporting] = useState([]);
  
   const [page,setPage] = useState(1);
   const [catId,setCatId] = useState(null);
   const [orderBy,setOrderBy] = useState(null);
   const [searchTerm,setSearchTerm] = useState('');
   const [isLoading, setIsLoading] = useState(false);

  //  usedebounce help us to delay search and prevent many api calls...
   const searchTermDebounce = useDebounce(searchTerm,300)


   useEffect(()=>{
    console.log(searchTermDebounce);

      if(!categories.length){
          fetchCategories();
      }
    if(!tasks.length){
        fetchTasks();
    }
    

  },[page,catId,orderBy,searchTermDebounce[0]])

   
    const fetchTasks = async (page=1) => {

      let response = null;
        try {
            if(catId) {

              response = await Api.get(`tasks/category/${catId}?page=${page}`);

            }else if(orderBy){

              response = await Api.get(`tasks/order/${orderBy.column}/${orderBy.direction}/tasks?page=${page}`)
            }else if(searchTermDebounce[0]!== ""){
          
              response = await Api.get(`tasks/search/${searchTermDebounce[0]}?page=${page}`);
              setIsLoading(false)
            }
            else{
              setIsLoading(true);

              response = await Api.get(`tasks?page=${page}`);
            }
          
            setTasks(response.data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);

    };

   const fetchCategories = async () => {

    const fetchedCatgeories = await useCategories();
    setCategories(fetchedCatgeories)

   }

    const confirmDelete =(id)=> {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              try {
                  Api.delete(`tasks/${id}`).then(prevTasks=> prevTasks.filter((task) => task.id !== id))

                  fetchTasks();
                  // Update the state of the tasks.
                 
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                 
      
      
            } catch (error) {
              console.log(error);
            }

              
            }
          })
    }

   

  return (<>
    
       <DashbaordLayout>
            {isLoading ? <div className="d-flex justify-content-center">
                                  <button class="btn btn-success" type="button" disabled>
                                          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                          Loading...
                                  </button> 
                          </div>
                       : 
                        <div className="container-fluid ">

                              <div className="row">
                                <div className="col-10">
                                    <div className="card border-secondary p-0">
                                      <div className="card-body">
                                        <h4 className="card-title ">Tasks</h4>
                                       
                                          <div className="d-flex justify-content-between">
                                            <div className="my-3 w-25">
                                            <input type="text"
                                              className="form-control shadow-sm"
                                              name="search" 
                                              id="search" 
                                              placeholder="Search Something ..."
                                              value={searchTerm}
                                              onChange={e=> {
                                                setPage(1)
                                                setOrderBy(null)
                                                setCatId(null)
                                                setIsLoading(false)
                                                setSearchTerm(e.target.value)
                                              }}
                                              />
                                            </div>
                                           
                                           {/* excel export */}
                                            <ExcelExport/>
                                           {/* excel export */}
                                          
                                           
                                            
                                          </div>

                                            <TableTask tasks={tasks} onDelete={confirmDelete}/>
                                            

                                        <div className="d-flex justify-content-between">
                                          <div>showing {tasks?.from || 0 } to {tasks?.to || 0 } from {tasks?.total}</div>

                                          <Pagination
                                                      activePage={tasks?.current_page ? tasks?.current_page : 0}
                                                      itemsCountPerPage={tasks?.per_page ? tasks?.per_page : 0 }
                                                      totalItemsCount={tasks?.total ? tasks?.total : 0}
                                                      onChange={(pageNumber) => {
                                                          fetchTasks(pageNumber)
                                                          setIsLoading(false)
                                                      }}
                                                      pageRangeDisplayed={10}
                                                      itemClass="page-item"
                                                      linkClass="page-link"
                                                      firstPageText="First Page"
                                                      lastPageText="Last Lage"
                                                      
                                                  />

                                          </div>
                                      </div>
                                    </div>
                                </div>
                               
                                <div className="col-2">
                                  {/* filter by category */}
                                  <Card title={'Filter By Catgeory'} >
                                        <div className="form-check  ">
                                            <input name="category" className="form-check-input" 
                                                onChange={() => {
                                                  
                                                    setCatId(null);
                                                    setPage(1)
                                                    fetchTasks();
                                                   
                                                }}
                                                type="radio" checked={!catId ? true : false}/>
                                            <label className="form-check-label" htmlFor="category">
                                                All
                                            </label>
                                        </div>
                                        {
                                            categories?.map(category => (

                                                <div className="form-check" key={category.id}>
                                                    <input name="category" className="form-check-input" 
                                                        onChange={(event) => {
                                                            setCatId(event.target.value);
                                                        }}
                                                        type="radio" value={category.id} id={category.id} />

                                                    <label className="form-check-label" htmlFor={category.id}>
                                                        {category.name}
                                                    </label>
                                                </div>
                                              
                                            ))
                                        }

                                  </Card>

                                  {/* orderby id */}
                                    <Card title={'Order By Id'}>

                                      <div className="form-check">
                                          <input name="id_asc" id="id_asc" className="form-check-input" 
                                              onChange={(event) => {
                                                  setCatId(null);
                                                  setPage(1)
                                                  setOrderBy({
                                                    column: 'id',
                                                    direction: event.target.value
                                                });
                                              }}
                                              value='asc'
                                              checked={orderBy && orderBy.column === 'id' && orderBy.direction === 'asc' ? true : false}
                                              type="radio"/>
                                          <label className="form-check-label " htmlFor="id_asc">
                                            ASC <FontAwesomeIcon icon={faArrowCircleUp}  style={styles.fontSize}/>
                                          </label>
                                      </div>

                                      <div className="form-check">
                                            <input name="id_desc" id="id_desc" className="form-check-input" 
                                                onChange={(event) => {
                                                    setCatId(null);
                                                    setPage(1)
                                                    setOrderBy({
                                                      column: 'id',
                                                      direction: event.target.value
                                                  });
                                                  
                                                  }}
                                                value='desc'
                                                checked={orderBy && orderBy.column === 'id' && orderBy.direction === 'desc' ? true : false}
                                                type="radio"/>
                                            <label className="form-check-label " htmlFor="id_desc">
                                              DESC <FontAwesomeIcon icon={faArrowCircleDown}  style={styles.fontSize}  />
                                            </label>
                                        </div> 
                                    </Card>
                                
                                  {/* orderby by title */}
                                  <Card title={'Order By Title'}>
                                      <div className="form-check ">
                                          <input name="a_z"id="a_z" className="form-check-input" 
                                              onChange={(event) => {
                                                  setCatId(null);
                                                  setPage(1)
                                                  setOrderBy({
                                                    column: 'title',
                                                    direction: event.target.value
                                                });
                                              }}
                                              value='asc'
                                              checked={orderBy && orderBy.column === 'title' && orderBy.direction === 'asc' ? true : false}
                                              type="radio"/>
                                          <label className="form-check-label " htmlFor="a_z">
                                            A to Z <FontAwesomeIcon icon={faArrowCircleUp}  style={styles.fontSize}/>
                                          </label>
                                      </div>

                                      <div className="form-check ">
                                            <input name="z_a" id="z_a"  className="form-check-input" 
                                                onChange={(event) => {
                                                    setCatId(null)
                                                    setPage(1)
                                                    setOrderBy({
                                                      column: 'id',
                                                      direction: event.target.value
                                                  });
                                                  
                                                  }}
                                                value='desc'
                                                checked={orderBy && orderBy.column === 'id' && orderBy.direction === 'desc' ? true : false}
                                                type="radio"/>
                                            <label className="form-check-label " htmlFor="z_a">
                                              Z to A <FontAwesomeIcon icon={faArrowCircleDown}  style={styles.fontSize}  />
                                            </label>
                                        </div> 
                                  </Card>
                                </div>
                              </div>
                        </div>
            }
        </DashbaordLayout>
    
    </>  );
}
 
export default Tasks;