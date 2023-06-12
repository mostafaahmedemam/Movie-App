import  Axios  from 'axios';
import {toast} from 'react-toastify';
import auth from '../services/authService';

Axios.defaults.headers.common['x-auth-token']=auth.getJwt();
Axios.defaults.baseURL = process.env.REACT_APP_API_URL;   
Axios.interceptors.response.use(null,error=>{
    debugger
    const expectedError=
    error.response&&
    error.response.status >=400&&
    error.response.status<500;
    if(!expectedError){
      console.log("Logging the error",error);
      toast("An unexpected error occurred");
    }
    return Promise.reject(error);
  });
export default{
get:Axios.get,
post:Axios.post,
put:Axios.put,
delete:Axios.delete
}   