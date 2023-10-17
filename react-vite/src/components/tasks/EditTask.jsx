import DashbaordLayout from "../layouts/DashboardLayout";
import  {yupResolver} from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import Api from "../../helpers/Api";
import { useEffect, useState } from "react";
import useCategories from "../hook/useCategories";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {

        const {id} = useParams();
        const [categories,setCategories] = useState([]);

        const navigate = useNavigate();
        const schema = yup.object({
            title:yup.string().required('title required').min(4),
            body:yup.string().required('body required').max(200,'Too long'),
            category_id:yup.number().required('catgeory required'),
        })
       
        let [category,setCategory] = useState();
        const [photo,setPhoto] = useState(null);

        const changeHandler = (event) => {
            setPhoto(event.target.files[0]);
        };
        const {handleSubmit,setValue ,reset,register,formState}= useForm({ resolver:yupResolver(schema),
              defaultValues : async()=> {

                const response = await Api.get(`tasks/show/${id}`)
               

                const task = response.data
                setValue('title', task?.title);
                setValue('body', task?.body);
                setValue('done', task?.done);
                setValue('category_id', task?.category_id);

                return{
                    title : task?.title,
                    body : task?.body,
                    done:task?.done,
                    category_id :task.category_id ,
                    // category :  setCategory( task.category_id ),
                   
                }
              },
              
             })
            
            
        const {errors,isSubmitting} = formState;
        
        

        const fetchCategories = async () => {

            const fetchedCatgeories = await useCategories();
            setCategories(fetchedCatgeories)
        
        }
       
        const submitForm =  (data)=>{
           try {
            return new Promise(_ => {
                setTimeout(() => {
                    const {title,done,category_id,body} = data
                    const formData = new FormData()
                    formData.append('title', title)
                    formData.append('category_id', category_id)
                    formData.append('body', body)
                    formData.append('done', done)
                    formData.append("photo", photo);
                    // if (photo) {
                    //     formData.append("photo", photo);
                    //   }

                    if(data){
                        
                           Api.put(`/tasks/update/${id}`,data).then(res=> console.log(res.data))
                        
                         reset()
                        toast.success('Task updated succefully !')
                        navigate('/tasks')
                    }
                },900)
              })
           
           } catch (error) {
            console.log("error occured ! : ",error);
           }
        }
  
    useEffect(()=>{
        fetchCategories()
    },[])
    return ( <>
            <DashbaordLayout>

                <div className="container ">
                   
                    <div className="card border-secondary">
                            <div className="card-body">
                                <h4 className="card-title">Edit Task</h4>
                                    <form onSubmit={handleSubmit(submitForm)} >
                            
    
                                    {/* <!-- Text input --> */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="title">Title</label>
                                        <input type="text" id="title"  {...register('title')} className="form-control shadow-sm" />
                                        {errors.title && <small className="text-danger fw-bold ">{errors.title.message}</small>}
                                    </div>
    
                                    {/* <!-- Message input --> */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="body">Body</label>
                                        <textarea className="form-control shadow-sm" {...register('body')} id="body" rows="4"></textarea>
                                        {errors.body && <small className="text-danger  fw-bold ">{errors.body.message}</small>}
    
                                    </div>
                                    {/* <!-- Message input --> */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="body">Catgeory</label>
                                    
                                        <label for="" class="form-label">City</label>
                                            <select class="form-select form-select-md shadow-sm"  {...register('category_id')}   name="category_id" id="">
                                            <option value="" disabled selected >Select a category</option>
                                            {
                                                            categories?.map((category,key)=> (
    
                                                            <option value={category.id}  key={key}  selected={category.id ===id}   >{category.name}</option>
                                                        
                                                        ))
                                                
                                            }
                                            </select>
                                    
                                        {errors.category_id && <small className="text-danger fw-bold ">please select a category </small>}
    
                                    </div>
                                    {/* <!-- File Photo input --> */}
                                    <div className="form-outline mb-4">
                                     <label className="form-label" for="body">Photo</label>
                                      <input type="file" id="title" {...register('photo')} name="photo" onChange={changeHandler} className="form-control shadow-sm" />
    
                                    </div>
                                    {/* <!-- Checkbox --> */}
                                    <div className="form-check d-flex justify-content-start mb-4">
                                        <input className="form-check-input me-2 shadow-sm"  {...register('done')} type="checkbox"  id="done"  />
                                        <label className="form-check-label" for="done"> Done </label>
                                    </div>
    
                               
                                    <button  disabled={isSubmitting} className="btn btn-primary btn-block mb-4">
                                        
                                        {
                                            isSubmitting &&(<span className="spinner-border mx-2 spinner-border-sm mr-1"></span>)

                                        }   
                                        Update Task
                                    </button>
    
                                    </form>
                            </div>
                    </div>   
 
                </div>

            </DashbaordLayout>


    </> );
}

export default EditTask;