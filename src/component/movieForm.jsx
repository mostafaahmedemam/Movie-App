
import React, { Component } from 'react';
import  Joi  from 'joi-browser';
import Navbar from './navbar';
import Form from './common/form';
import DropDown from './common/dropDown';
import { getGenres } from '../services/genreService';
import {saveMovie,getMovie}from'../services/movieService';

class MovieForm extends Form {
    saveHandler=()=>{
        this.props.history.push('/movies');
    }
    handleSubmit(){}
    
    state={
        data:{
         
            title:'',
            genreId:'',
            numberInStock:'',
            dailyRentalRate:''
        },
        errors:{},
        genres:[]
    };
    schema = {
        _id:Joi.string(),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().min(0).max(1000).label("Number In Stock"),
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
    };
    async populateGenres(){
        //get all genre and set it to state
        const {data}=await getGenres();
        this.setState({genres:data});
        
    }
    async populateMovies(){
        
        try{

        const movieId=this.props.match.params.id;
        if(movieId==="new")return;
        //check is movie in list of movies or not and if not go not found page
        const {data:movie}=await getMovie(movieId);
        //set data with movies after add new one
        this.setState({data:this.mapToViewModel(movie)});

        }
        catch(ex){
        if(ex.response && ex.response.status===404)
                return this.props.history.replace("not-found");
        }
    }
    async componentDidMount(){
        await this.populateGenres();
        await this.populateMovies();
    }
    mapToViewModel(movie){
        debugger
        return{
            _id:movie._id,
            title:movie.title,
            genreId:movie.genre._id,
            numberInStock:movie.numberInStock,
            dailyRentalRate:movie.dailyRentalRate
        };

    }
    async doSubmit(){
        debugger
        await saveMovie(this.state.data);
        this.props.history.push("/movies");
    }
    render() { 
    

   //{this.renderInput("genre","Genre")}
        return (<div className='row'>
     
       <div className='col-4 m-5'>
      <h1>
          Movie Form
      </h1>
      <form onSubmit={this.handleSubmit}>
          
         {this.renderInput("title","Title")}
         {this.renderSelect("genreId","Genre",this.state.genres)}
         {this.renderInput("numberInStock","Number In Stock")}
         {this.renderInput("dailyRentalRate","Rate")}
          {this.renderButton("Save")}
          
       </form>
       </div>
   </div>);
    }
}
 
export default MovieForm;