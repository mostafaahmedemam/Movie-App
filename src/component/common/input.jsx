import React from 'react';
const Input = ({name,label,error,...rest}) => {
    return ( <div className="mb-3">
    <label  htmlFor={name}className="form-label">
        {label}
    </label>
    <input
    {...rest}
     name={name}
     className="form-control"
    id="username"
    />
    {error && <div className="alert alert-danger">{error}</div>}
    </div> 
    );
}
 
export default Input;
