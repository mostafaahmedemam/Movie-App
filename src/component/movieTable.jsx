import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from './common/table';
class MovieTable extends Component {
  columns=[
    {path:'title',label:'Title'
    ,content:movie=><Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
    {path:'genre.name',label:'Genre'},
    {path:'numberInStock',label:'Stock'},
    {path:'dailyRentalRate',label:'Rate'},
    {
        key:"delete",
        content:( movie=><button onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm">Delete</button>)
    }
    
  ];
  
     /* <table className="table">
         <TableHeader
         columns={this.columns}
         sortColumns={sortColumn}
         onSort={onSort}></TableHeader>
         <TableBody data={movies} columns={this.columns}></TableBody><tbody>
        {movies.map(movie =>(
        <tr>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
            
            </td>
            <td>
            <button onClick={() => onDelete(movie)}
             className="btn btn-danger btn-sm">Delete</button>
            </td>
           
        </tr>
        ))}
        
    </tbody>
        */
    render() { 
        debugger
        const {movies,onSort,sortColumn}=this.props;
        return (
            <Table data={movies}
            columns={this.columns}
            sortColumns={sortColumn}
            onSort={onSort}></Table>
       
  
    
        );
    }
}
 
export default MovieTable;