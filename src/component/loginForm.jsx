import React, { Component } from 'react';
import Input from './common/input';
import Joi  from 'joi-browser';
import Form from './common/form';
import Navbar from './navbar';
import { login } from './../services/loginService';
import auth from '../services/authService';

class LoginForm extends Form {
    username=React.createRef();
    state={
        data:{
            username:'',
            password:''
        },
        errors:{}
    };
    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    };

    
   
    doSubmit=async()=>{
        
        try{
            const {data}=this.state;
        
            await auth.login(data.username,data.password);
            const {state}=this.props.location;    
            window.location=state?state.from.pathname:'/';
        }
        catch(ex){
            if(ex.response && ex.response.status===400)
            {
                const errors={...this.state.errors};
                errors.username=ex.response.data;
                this.setState({errors});
            }
        }
          //Call server
          //console.log("submitted");
    }

    render() { 
        
       // const {data,errors}=this.state;

        return(
         <div className='row'>
           
            <div className='col-5 m-5'>
           <h1>Login</h1>
           <form onSubmit={this.handleSubmit}>
               
              {this.renderInput("username","Username")}
              {this.renderInput("password","Password","password")}
               {this.renderButton("Login")}
               
            </form>
            </div>
        </div>);
    }
}
 
export default LoginForm ;