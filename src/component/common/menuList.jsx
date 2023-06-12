import React, { Component } from 'react';
import { element } from 'prop-types';


class MenuList extends React.Component {
    render() { 
        
       // const {Generes}=;
       //const Genres=[{_id:"", name: "All Genre"},...this.props.genere];
       const Elements=this.props.listElements;
       console.log(Elements);
       debugger
        return <div>
            
            <div className="list-group">
                {Elements.map(element=>(
                    <a onClick={()=>this.props.onListChange((element))}
                    className={element===this.props.selectedElement?"list-group-item list-group-item-action active":"list-group-item list-group-item-action"}
                    key={element.id}
                    aria-current="true">
                    {element.name} 
                    </a>

                ))
                    
                }    
            </div>
        </div>;
    }
}
 
export default MenuList;


