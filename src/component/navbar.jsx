import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
class Navbar extends React.Component {
    render() { 
        return <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <NavLink  to="/" className="navbar-brand" >Vidly</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink  to="/movies" className="nav-link active" aria-current="page" >Movies</NavLink>
        </li>
        <li className="nav-item">
          <NavLink  to="/Customer" className="nav-link active" aria-current="page" >Customer</NavLink>
        </li>
        <li className="nav-item">
          <NavLink  to="/Rental"className="nav-link active" aria-current="page" >
            Rental
          </NavLink>
        </li>
        {!this.props.user && <React.Fragment>
        <li className="nav-item">
        <NavLink  to="/login"className="nav-link active" aria-current="page" >
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink  to="/register"className="nav-link active" aria-current="page" >
          Register
        </NavLink>
      </li>
      </React.Fragment>
      }{this.props.user && <React.Fragment>
        <li className="nav-item">
        <NavLink  to="/profile"className="nav-link active" aria-current="page" >
          {this.props.user.name}
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink  to="/Logout"className="nav-link active" aria-current="page" >
          Logout
        </NavLink>
      </li>
      </React.Fragment>
      }
        </ul>
    </div>
  </div>
</nav>
        </div>;
    }
}
 
export default Navbar;