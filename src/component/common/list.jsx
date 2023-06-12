import React, { Component } from 'react';


class List extends React.Component {
    render() { 
        
       // const {Generes}=;
       //const Genres=[{_id:"", name: "All Genre"},...this.props.genere];
       const Genres=this.props.genere;
        return <div>
            
            <div className="list-group">
                {Genres.map(genere=>(
                    <a onClick={()=>this.props.onListChange((genere))}
                    className={genere===this.props.selectedItem?"list-group-item list-group-item-action active":"list-group-item list-group-item-action"}
                    key={genere._id}
                    aria-current="true">
                    {genere.name}
                    
                    </a>

                ))
                    
                }    
            </div>
        </div>;
    }
}
 
export default List;


