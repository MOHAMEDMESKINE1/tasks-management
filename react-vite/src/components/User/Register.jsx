import { useState } from "react";
import AuthUser from "../../auth/AuthUser";
import { useNavigate } from "react-router-dom";

import {  toast } from 'react-toastify';
// validation
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const Register = () => {
     // get http from authuser 
     const {http,setToken} = AuthUser();
     // get http from authuser 
 
    //  const [name,setName] =useState();
    //  const [email,setEmail] =useState();
    //  const [password,setPassword] =useState();

     const navigate= useNavigate()

     const schema = yup.object({
        name:yup.string().required('name required'),
        email:yup.string().required('email required').email(),
        password:yup.string().required('password required').min(5),
      })
      
      const {register,handleSubmit,formState} = useForm({
        resolver:yupResolver(schema)
      });

      const {errors,isLoading,isSubmitSuccessful,submitCount,isValid,isDirty} = formState


    //  const handleNameChange  =(e)=>{
    //      setName(e.target.value)
    //  }
    //  const handleEmailChange  =(e)=>{
    //      setEmail(e.target.value)
    //  }
    //  const handlePasswordChange  =(e)=>{
    //      setPassword(e.target.value)
    //  }
    
     const submitForm = (data)=>{
         console.log(data);
        //  const user = {
        //      name,
        //      email,
        //      password
        // }
         http.post('/register',data)
         .then(_=> {
            navigate('/login')
            toast.success("Succes !")

        })
         .catch(err=>console.log(err))
        
        
     }
    
    return ( <>
          <div className="m-5 ">
            <div className="row">
               
                 {
                    submitCount >3 ? 
                    <div class="d-flex fw-bold align-items-center my-4 p-4 mb-4 text-sm text-danger border border-danger rounded bg-light" role="alert">
                                    <svg width="25" class="mx-3 flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                    </svg>
                                    <div>
                                        <span class="font-medium">Danger alert!</span> You are blocked contact the adminstrator !.
                                    </div>
                     </div>
                    : 
                    <>
                    {isLoading && <span>Loading ....</span>}
                    {/* {(isSubmitSuccessful ) &&  <div class="p-4 mb-4 text-sm text-success   fw-bold  broder  border-1 " role="alert"><span class="font-medium mx-2">Success !</span>User has been created successfully</div>} */}

                    <div className="col-md-6 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="img-fluid" alt="Sample image"/>
                    </div>
                    <div className="col-10 col-md-5 ">
                    <h1 className="text-primary">Register </h1>
                        <div className=" ">
                                <form className="mt-5" onSubmit={handleSubmit(submitForm)}>
                    

                                    {/* <!-- name input --> */}
                                    <div class="form-outline mb-4 ">
                                        <label class="form-label left" for="name"> Name</label>
                                        <input type="text" id="name" {...register('name')} class="form-control shadow-sm" /> {/*onChange={handleNameChange} */}
                                        <small className="text-danger fw-bold">{errors.name?.message}</small>
                                    </div>

                                    {/* <!-- email input --> */}
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="email">Email</label>
                                        <input type="email" id="email" {...register('email')}  class="form-control shadow-sm" />
                                        <small className="text-danger fw-bold">{errors.email?.message}</small>
                                    </div>

                                    {/* <!-- password input --> */}
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="password">Password</label>
                                        <input type="password" id="password" {...register('password')}   class="form-control shadow-sm" />
                                        <small className="text-danger fw-bold">{errors.password?.message}</small>

                                    </div>
                                
                                    {/* <!-- Submit button --> */}
                                    {/*
                                    disabled={!(isValid && isDirty)}
                                    */}


                                    <input  type="submit" id="form3Example4" className="btn btn-primary form-control form-control-lg "
                                    value="Regitser" />
                                </form>
                            </div>
                        </div>
                    
                    </>
                 }
            </div>
            
          </div>
        
    </> );
}
 
export default Register;