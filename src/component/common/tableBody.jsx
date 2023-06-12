import React, { Component } from 'react';
import _ from "lodash";

class TableBody extends React.Component {
    renderCell=(item,column)=>{
        if(column.content){
            return column.content(item);
        }
        return _.get(item,column.path);
    };
    createKey=(item,column)=>{
        return item._id +(column.path||column.key);
    };
    render() { 
//_get(item,column.path)=====> thatsmean item[columns path] despite path is complex
//columnpath.name
debugger
        const {data,columns}=this.props;
        return (
        <tbody>
            {data.map(item=>
                <tr key={item._id}>
                {columns.map(column=>
                <td key={this.createKey(item,column)}>
                {this.renderCell(item,column)}   
                </td>
            )}
            </tr>)}
              
</tbody>
            );
        }
}
 
export default TableBody;