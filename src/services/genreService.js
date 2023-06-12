import http from './httpservice'
//import config from '../config.json'
export function getGenres(){
    return http.get("/genres");
}