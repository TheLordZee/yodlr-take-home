import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import "./NavBar.css";

const NavBar = ({signout}) => {
    const currUser = JSON.parse(localStorage.getItem("currUser"))
  return(
      <div>
        <Navbar expand="md" className="sticky-top">
          <NavLink exact to="/" className="navbar-brand ms-2">
            Yoldr
          </NavLink>

          <Nav className="ml-auto" navbar>
            {(currUser) ? 
              <>
              <NavItem className="nav-item">
                <Link to="/admin">Admin</Link>
              </NavItem>  
              <NavItem className="nav-item">
                <Link to="/create">Create User</Link>
              </NavItem>  
              <NavItem className="nav-item">
                <Link to="" onClick={signout}>Log Out {currUser.firstName}</Link>
              </NavItem>  
              </>
              :
              <>
              <NavItem className="nav-item">
                <NavLink to="/register">Register</NavLink>
              </NavItem>  
              <NavItem className="nav-item">
                <NavLink to="/login">Admin Login</NavLink>
              </NavItem>  
              </>
            }
            
          </Nav>
        </Navbar>
      </div>
  );
}
  
export default NavBar;