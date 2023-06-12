import React, { Component } from 'react';
import Joi  from 'joi-browser';
import Input from './input';
import Select from './drop';
class Form extends React.Component {
    state={
        data:{},
        errors:{}
    };
    validate=()=>{
        debugger
        const options={abortEarly:false};
        const {error}=Joi.validate(this.state.data,this.schema,
            options);
        
        if(!error)return null;
        const errors={};
        for(let item of error.details)
            errors[item.path[0]]=item.message;
        return errors;
       
    }
    validateProperty=({name,value})=>{
        debugger
        const obj={[name]:value};
        const schema={[name]:this.schema[name]};
        const{error}=Joi.validate(obj,schema);
        return (error)?error.details[0].message:null;
     }
     handleSubmit=e=>{
        e.preventDefault();
        //const username=document.getElementById("username").value;
       // const username=this.username.current.value;
        const errors=this.validate();
        //console.log(errors);
        this.setState({errors:errors||{}});
        if(errors)return;
        this.doSubmit();
    } 
    changeHandler=({currentTarget:input})=>{
        
        //updated or remove error of field
        const errors={...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if(errorMessage)errors[input.name]=errorMessage;
        else delete errors[input.name];
        //change value of state property based on input user
        const data={...this.state.data};
        data[input.name]=input.value;
        this.setState({data,errors});
        
        
        //  console.log(data.username,data.password);
    }
    renderInput=(name,label,type="text")=>{
        const {data,errors}=this.state;
       return(
            <Input 
            type={type}
            name={name}
            value={data[name]}
            label={label}
            onChange={this.changeHandler}
            error={errors[name]}
            ></Input> 
        );

    }
    renderSelect=(name,label,options)=>{
        const {data,errors}=this.state;
       return(
            <Select 
            name={name}
            value={data[name]}
            label={label}
            options={options}
            onChange={this.changeHandler}
            error={errors[name]}
            ></Select> 
        );

    }
    renderButton(label){
       return (<button disabled={this.validate()} type="submit" className="btn btn-primary">
        {label}
        </button>
       );
    }
}
 
export default Form;