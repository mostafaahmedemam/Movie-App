import React, { Component } from 'react';



class TableHeader extends React.Component {
    raiseSort=path=>{
        debugger
    const sortColumn={...this.props.sortColumns};
    //this.setState({sortColumn:{path:path,order:"asc"}});
    if(sortColumn.path===path){
        sortColumn.order=(sortColumn.order==='asc')?
        'desc':'asc';
    }
    else{
     sortColumn.path=path;
     sortColumn.order='asc';
    }
    this.props.onSort(sortColumn);

   }

    render() { 
        debugger
        return (<thead>
            <tr>
                {this.props.columns.map(column=>(<th
                key={column.path || column.key}
                onClick={()=>this.raiseSort(column.path)}>
                {column.label}
                </th>)) }
                
            </tr>
        </thead>
        );
    }
}
 
export default TableHeader;