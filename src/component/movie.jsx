import React, { Component } from 'react';
import { getMovies , deleteMovie} from "../services/movieService";
import {getGenres} from '../services/genreService'
import Pagination from './common/pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {paginate} from '../utils/paginate'
import List from './common/list';
import MovieTable from './movieTable';
import NavBar from "./navbar";
import {Link} from 'react-router-dom';
import _ from "lodash";
import SearchBox from './common/searchBox';
import { toast } from 'react-toastify';

class Movie extends React.Component {
    
    state={
        movies:[],
        pageSize:4,
        currentPage:1,
        genere:[],
        sortColumn:{path:"title",order:"asc"},
        searchQuery:"",
        selectedGenre:null
    };
    async componentDidMount() {
        const{data}=await getGenres();
        const genere=[{_id:"",name:"All Genres"},...data]
        const {data:movies}=await getMovies();
        this.setState({movies,genere})
    }
   deleteHandeler =async movie=>
   {    
       const originalMovies =this.state.movies;
       const movies=originalMovies.filter(mov => mov._id!==movie._id);
        this.setState({movies});
        try{
            await deleteMovie(movie._id);
        }
        catch(ex){
            if(ex.response && ex.response.status===404){
                toast.error('This movie has already been deleted.');
            }
            this.setState({movies:originalMovies});
        }
    }
    handlePageChange=page=>{
        
        this.setState({currentPage:page});

    }
    handleSort=sortColumn=>{
        debugger
      
       this.setState({sortColumn});
    }
    handleListChange=genre=>{
        debugger
       // this.setState({currentPage:page});
      this.setState({selectedGenre:genre,searchQuery:"",currentPage:1})
    }

    handleGenre(allMov){
        
        return allMov.filter(mov => mov.genre._id===this.state.selectedGenre._id);
    }
    handleSearch=query=>{
        this.setState({searchQuery:query,selectedGenre:null,currentPage:1});
    }

    getPagedData=()=>{
        debugger    
        const {pageSize,
            currentPage,
            movies:allMovies
            ,genere,
            selectedGenre
            ,sortColumn,
        searchQuery}=this.state;

            let filteredMovies=allMovies;
            if(searchQuery)
            filteredMovies=allMovies.filter(mov =>
                 mov.title.toLowerCase().startsWith(searchQuery.toLowerCase()));

            else if(selectedGenre && selectedGenre._id){
                filteredMovies=allMovies.filter(mov => mov.genre._id===this.state.selectedGenre._id);    
            }
             
            const sorted=_.orderBy(filteredMovies,[sortColumn.path],[sortColumn.order]);
    
           /*
           if(selectedGenre.name!="All Genre"){
                var updatedMovies=this.handleGenre(allMovies);
                var movies=paginate(updatedMovies,currentPage,pageSize);
                count=movies.length;
            }
            else{
            var movies=paginate(allMovies,currentPage,pageSize);
            }
            */
            var movies=paginate(sorted,currentPage,pageSize);
            return {totalCount :filteredMovies.length,data:movies}
    }
    render() { 
        debugger
       var {length:count}= this.state.movies;
       const {length:countGenere}= this.state.genere;
       const {pageSize,currentPage,sortColumn,searchQuery}=this.state;
      const {totalCount,data:movies}=this.getPagedData();
       const{user}=this.props;
      // if(count===0) return <p>There are no movies in the database.</p>;
        debugger
        return (
           <div>
        <div className='row'>
             
            <div className='col-3 m-5'>
            <List
            genere={this.state.genere}
            selectedItem={this.state.selectedGenre}
            onListChange={this.handleListChange}
            ></List>
            </div>
            <div className='col m-4'>
            
            {user &&(<Link to="/movies/new"
            className="btn btn-primary"
            style={{marginBottom:20}}>
            New Movie
            </Link>)}
            <SearchBox
            value={searchQuery}
            onChange={this.handleSearch}
            ></SearchBox>
                <p>Showing {totalCount} movies in the database.</p>
                <MovieTable
                   movies={movies}
                   sortColumn={sortColumn}
                   onDelete={this.deleteHandeler}
                   onSort={this.handleSort}
                >
                </MovieTable>

                <Pagination itemsCount={totalCount} 
                pageSize={pageSize}
                 currentPage={currentPage}
                  onPageChange={this.handlePageChange}>
                </Pagination>      
            </div>
            
        
        </div>
        </div>);
    }
}
 
export default Movie;
