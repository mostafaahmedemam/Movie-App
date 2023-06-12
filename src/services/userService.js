import http from './httpservice';
//import config from "../config.json";

const apiEndpoint="/users";


export function register(user){
    debugger
    return http.post(apiEndpoint,{
        password:user.password,
        name:user.name,
        email:user.username
    });

}
