import React, { Component } from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

class Table extends React.Component {
    render() { 
        
        const {columns,sortColumns,onSort,data}=this.props;
        return ( <table className="table">
        <TableHeader
        columns={columns}
        sortColumns={sortColumns}
        onSort={onSort}></TableHeader>
        <TableBody data={data} columns={columns}></TableBody>
        </table>
        );
    }
}
 
export default Table;