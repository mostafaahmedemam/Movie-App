import React, { Component } from 'react';
import { element } from 'prop-types';
class Container extends React.Component {
    
    render() { 
        debugger
        return <div>
            <p>
            {this.props.selectedElement.name}
            </p>
        </div>;
    }
}
 
export default Container;