import { text } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import Input from './input';
const SearchBox = ({value,onChange}) => {
    debugger
    return (
          <input
        className="form-control my-3" 
        type="text"
        name="query"
        value={value}
        placeholder="search..."
        onChange={e=>onChange(e.currentTarget.value)}
        
        ></input> );
}
 
export default SearchBox;