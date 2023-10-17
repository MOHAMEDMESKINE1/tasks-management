import DashbaordLayout from "../layouts/DashboardLayout";
import * as yup from 'yup'
import Api from "../../helpers/Api";
import  {yupResolver} from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {

        const [categories,setCategories] = useState([]);
        const [photo,setPhoto] = useState();
        const [errorsLaravel,setErrorsLaravel] = useState([]);

        const navigate = useNavigate();
        const schema = yup.object({
            title:yup.string().required('title required').min(4),
            body:yup.string().required('body required').max(200,'Too long'),
            category_id:yup.number().required('catgeory required'),
            photo:yup.string().required('photo required'),
        })
        const {handleSubmit ,reset,register,formState}= useForm({ 
            resolver:yupResolver(schema),
            //   defaultValues : {
            //     title : "Learn React Query",
            //     body : "new React Library for customization",
            //   }
             })

        const {errors,isSubmitting} = formState;
        
        
        const changeHandler = (event) => {
            setPhoto(event.target.files[0]);
        };

        const fetchCategories = async () => {

            const fetchedCatgeories = await Api.get('categories/all');
            setCategories(fetchedCatgeories.data)
        
        }

        const submitForm = (data)=>{
           try {
            return new Promise(_ => {
                setTimeout(() => {
                    const {title,done,category_id,body} = data
                    
                    const formData = new FormData()

                    formData.append('title', title)
                    formData.append('category_id', category_id)
                    formData.append('body', body)
                    formData.append('done', done)
                    formData.append('photo', photo)
                    
                    if(data){
                        
                         Api.post('tasks/create',formData).then(res=> console.log(res.data))
                         reset()
                      
                          
                          toast.success('Task created succefully !')
                        navigate('/tasks')
                    }
                },900)
              })
           
           } catch (error) {
            console.log("error occured ! : ",error);
            setErrorsLaravel(error.response.data.errors)
           }
        }
    const displayLaravelErrors  = (field) =>(

        errorsLaravel?.[field]?.map((error,index) => (

            <div class="alert alert-primary" role="alert" key={index}>
                <strong>Error !</strong> {error}
            </div>
        ) )

    )
    useEffect(()=>{
        fetchCategories()
    },[])
    return ( <>
            <DashbaordLayout>

                <div className="container ">
                   
                    <div className="card border-secondary">
                            <div className="card-body">
                                <h4 className="card-title">Create Task</h4>
                                    <form onSubmit={handleSubmit(submitForm)}>
                            
    
                                    {/* <!-- Text input --> */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="title">Title</label>
                                        <input type="text" id="title" {...register('title')} className="form-control shadow-sm" />
                                        {errors.title && <small className="text-danger fw-bold ">{errors.title.message}</small>}
                                        {displayLaravelErrors('title')}
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
                                            <select class="form-select form-select-md shadow-sm"  {...register('category_id')} name="category_id" id="">
                                            <option value="" disabled  selected>Select a category</option>
                                            {
                                                            categories?.map((category,key)=> (
    
                                                            <option value={category.id}  key={key} >{category.name}</option>
                                                        
                                                        ))
                                                
                                            }
                                            </select>
                                    
                                        {errors.category_id && <small className="text-danger fw-bold ">please select a category </small>}
    
                                    </div>
                                    {/* <!-- File Photo input --> */}
                                    <div className="form-outline mb-4">
                                         <label className="form-label" for="photo">Photo</label>
                                      <input type="file" id="photo" {...register('photo')} onChange={changeHandler} className="form-control shadow-sm" />
                                      {errors.photo && <small className="text-danger  fw-bold ">{errors.photo.message}</small>}

                                    </div>
                                    {/* <!-- Checkbox --> */}
                                    <div className="form-check d-flex justify-content-start mb-4">
                                        <input className="form-check-input me-2 shadow-sm" name="done" value="1"  {...register('done')} type="checkbox"  id="done"  />
                                        <label className="form-check-label" for="done"> Done </label>
                                    </div>
    
                               
                                    <button  disabled={isSubmitting} className="btn btn-primary btn-block mb-4">
                                        
                                        {
                                            isSubmitting &&(<span className="spinner-border mx-2 spinner-border-sm mr-1"></span>)

                                        }   
                                    Create Task
                                    </button>
    
                                    </form>
                            </div>
                    </div>   
 
                </div>

            </DashbaordLayout>


    </> );
}

export default CreateTask;