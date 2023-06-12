import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Movie from './component/movie';
import 'bootstrap/dist/css/bootstrap.min.css';


import  '@fortawesome/react-fontawesome';
import movieTable from './component/movieTable';
import { BrowserRouter } from 'react-router-dom';
//console.log(process.env);
ReactDOM.render(
  <BrowserRouter>
 <App/>
 </BrowserRouter>
 ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
