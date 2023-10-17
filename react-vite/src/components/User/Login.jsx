import { useState } from "react";
import AuthUser from "../../auth/AuthUser";

import {  toast } from 'react-toastify';
// validation
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object({
    email:yup.string().required('email required'),
    password:yup.string().required('password required'),
  })
  const {register,handleSubmit,formState} = useForm({
   
    resolver:yupResolver(schema)

  });

  const {errors,isLoading,isSubmitting} = formState
    // get http from authuser 
        const {http,setToken} = AuthUser();

    // get http from authuser 

   
    const submitForm =(data)=>{
      return new Promise(_ => {
       setTimeout(() => {

        http.post('/login',data)
        .then(response=> {
            if(response.status === 200){
                const user =   response.data.user;
                const token =  response.data.access_token;
              setToken(user,token)
              console.log(user);

                toast.success("Welcome to your dashboard Mr "+user.name)



            }else{
                console.log("error");

            }
        })
        .catch(err=>{
          // console.log(err)
          toast.error("Inavlid Credentials !")

        })
       }, 1500);
      })
       
    }

  
    if(isLoading){
      return  <div>Loading ...</div>
    }
    return (<>
    <section>
  
      <div className="container-fluid h-custom m-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-6 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid" alt="Sample image"/>
          </div>
          <div className="col-10 col-md-4 ">
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="divider d-flex align-items-center my-4">
                <h1 className="text-primary">Login </h1>
              </div>

              <div className=" mb-4">
                <input type="email"  {...register("email")}     id="form3Example3" className= "form-control shadow-sm form-control-lg"
                  placeholder="Enter a valid email address" />
                    
                      <small className="text-danger fw-bold">{errors.email?.message}</small>
              </div>

              <div className=" mb-3">
                <input type="password" {...register("password")}  id="form3Example4" className="form-control  shadow-sm form-control-lg"
                  placeholder="Enter password" />

                  <small className="text-danger fw-bold">{errors.password?.message}</small>

              </div>
              <div className=" mb-3">
                {/* <input  disabled={!(isValid && isDirty)}  type="submit" id="form3Example4" className="btn btn-primary form-control form-control-lg "
                  value="Log In" /> */}
                    <button  disabled={isSubmitting} className="btn btn-primary btn-block mb-4">
                                        
                    {
                        isSubmitting &&(<span className="spinner-border mx-2 spinner-border-sm mr-1"></span>)

                    }   
                    Login 
              </button>
              </div>
             

            </form>
          </div>
        </div>
      </div>
    </section>
    

     

      
    </>  );
}
 
export default Login;