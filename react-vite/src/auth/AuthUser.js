import axios from 'axios'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AuthUser = () => {
    
    const navigate = useNavigate()

    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }
    
    const getUser = () => {
        const userString = sessionStorage.getItem('user')
        const user_detail = JSON.parse(userString)
        return user_detail ;
    }
    
    const [token,setToken] = useState(getToken);
    const [user,setUser] = useState(getUser);

    const saveToken = (user,token) => {
        sessionStorage.setItem('user',JSON.stringify(user))
        sessionStorage.setItem('token',JSON.stringify(token))

        setToken(token)
        setUser(user)
       
        navigate('/dashboard')
    }
    const logout  = () => {
        sessionStorage.clear()
        navigate('/login')
    }
    
    const http = axios.create({
        baseURL:"http://localhost:8000/api",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    }) 



    return {
        http,
        token,
        user,    
        setToken:saveToken,
        getToken,
        logout,
        
        
    }
}
 
export default AuthUser;