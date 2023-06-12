import logo from './logo.svg';
import './App.css';

import { Route,Switch ,Redirect} from "react-router-dom";
import Movie from './component/movie';
import Home from './component/home';
import Customer from './component/Customer';
import NotFound from './component/notFound';
import Rentals from './component/rentails';
import MovieForm from './component/movieForm';
import LoginForm from './component/loginForm';
import RegisterForm from './component/register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { Component } from 'react';
import NavBar from './component/navbar';
import Logout from './component/logout';
import auth from './services/authService'
import ProtectedRoute from './component/common/protectedRoute';
import MenuWidget from './component/menuWidget';

import Submit from './component/upload';
class App extends Component{
  state={
    
  };
componentDidMount() {
  const user =auth.getCurrentUser();
  this.setState({user});
}
  render(){
    const{user}=this.state;
    return(
      <div className="App">
      <ToastContainer/>
     <NavBar user={user}/>
     <main className='container'>
     <Switch>
     <ProtectedRoute path="/movies/:id"  
      component={MovieForm}
      />
     <Route path="/logout"  component={Logout}></Route>
     <Route path="/upload"  component={Submit}></Route>
     <Route path="/menu"  component={MenuWidget}></Route>
     <Route path="/movies/new"  component={MovieForm}></Route>
     <Route path="/login"  component={LoginForm}></Route>
     <Route path="/register"  component={RegisterForm}></Route>
     <Route path="/Rental"  component={Rentals}></Route>
     <Route path="/movies"
      render={props=><Movie {...props} user={this.state.user}/>} 
     ></Route>
     <Route path="/customer" component={Customer}/>\
     <Redirect from="/"to="/movies"></Redirect>
     <Route path="/not-found" component={NotFound}></Route>
     <Route path="movies/not-found" component={NotFound}></Route>
     <Redirect to="/not-found"></Redirect>
     </Switch>
     </main>
    </div>

    );
  }
}
export default App;
/*
function App() {
  return (
    <div className="App">
      <ToastContainer/>
     
     <Switch>
     <Route path="/movies/:id"  component={MovieForm}></Route>
     <Route path="/movies/new"  component={MovieForm}></Route>
     <Route path="/login"  component={LoginForm}></Route>
     <Route path="/register"  component={RegisterForm}></Route>
     <Route path="/Rental"  component={Rentals}></Route>
     <Route path="/movies" component={Movie}></Route>
     <Route path="/customer" component={Customer}/>\
     <Redirect from="/"to="/movies"></Redirect>
     <Route path="/not-found" component={NotFound}></Route>
     <Route path="movies/not-found" component={NotFound}></Route>
     <Redirect to="/not-found"></Redirect>
     </Switch>
    </div>
  );
}

export default App;
*/