import React, { Component } from 'react';
class DropDown extends React.Component {
    clickHandler(){}
    render() { 
        return (
            <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Genre
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" >Action</a></li>
    <li><a class="dropdown-item" >Comdey</a></li>
    <li><a class="dropdown-item" >Thriler</a></li>
  </ul>
</div>
        );
    }
}
 
export default DropDown;