import http from './httpservice';
//import config from "../config.json";
import jwtDecode from 'jwt-decode';
import { func } from 'prop-types';
//const apiEndpoint=config.apiEndpoint+"/auth";
const apiEndpoint="/auth";
const tokenKey="token";

export async function login(email,password){
    debugger
    const{data:jwt}=await http.post(apiEndpoint,{email,password});
    localStorage.setItem(tokenKey,jwt);

}
export function logout(){

    localStorage.removeItem(tokenKey);
}
export function getCurrentUser(){
    try{
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
        //console.log(user);
        
      }
      catch(ex){
          return null;
      }
}
export  function loginWithjwt(jwt){
    debugger
    localStorage.setItem(tokenKey,jwt);

}
export function getJwt(){
    return localStorage.getItem(tokenKey);
}
export default{
    login,
    logout,
    getCurrentUser,
    loginWithjwt,
    getJwt
    
}