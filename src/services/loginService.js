import http from './httpservice';
import config from "../config.json";

//const apiEndpoint=config.apiEndpoint+"/auth";
const apiEndpoint="/auth";

export function login(email,password){
    debugger
    return http.post(apiEndpoint,{email,password});

}


