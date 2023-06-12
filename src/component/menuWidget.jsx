import { element } from 'prop-types';
import React, { Component } from 'react';
import List from './common/list';
import Container from './container';
import MenuList from './common/menuList';
class MenuWidget extends React.Component {
    state={
        listElements:[
        {name: 'Menu',id:'1'},
        {name: 'Images',id:'2'}
    ],
        selectedElement:""
    };
    handleListChange=element=>{
        debugger
       // this.setState({currentPage:page});
      this.setState({selectedElement:element})
    }
    render() { 
        
        return <div >
            <div>
            <MenuList
             listElements={this.state.listElements}
             selectedElement={this.state.selectedElement}
             onListChange={this.handleListChange}>

            </MenuList>
            </div>
         
        </div>;
    }
}
 
export default MenuWidget;