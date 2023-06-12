import React, { Component } from 'react';
import Form from './common/form';
import Navbar from './navbar';
import  Joi  from 'joi-browser';
import * as userService from "../services/userService";
import auth from"../services/authService";
class RegisterForm extends Form {
    state={
        data:{
            username:"",
            password:"",
            name:"",
        },
        errors:{}
    };
    schema={
        username: Joi.string().required().email().label("Username"),
        password: Joi.string().required().min(5).label("Password"),
        name:Joi.string().required().label("Name")
    };
    async doSubmit(){
        try{

       const response=await userService.register(this.state.data);
        localStorage.setItem("token",response.headers["x-auth-token"]);
        //this.props.history.push("/");
        window.location="/";
        }
        catch(ex){
            debugger
           
            if(ex.response && ex.response.status===400)
            {
                const errors={...this.state.errors};
                errors.username=ex.response.data;
                this.setState({errors});
            }
            
        }
    }
    render() { 
        return <div className='row'>
    
            <div className='col-4 m-5'>
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
            {this.renderInput("username","UserName")}
            {this.renderInput("password","Password","password")}
            {this.renderInput("name","Name")}
            {this.renderButton("Register")}
            </form>
            </div>
        </div>;
    }
}
 
export default RegisterForm;