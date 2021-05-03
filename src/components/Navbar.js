import React from "react";
import {Navbar,Nav} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom"

const NavBar =() =>{
    return<>
    <Navbar bg="primary" expand="lg">
  <Navbar.Brand href="#home">Student Management System</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav " />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto text-white">
      <Nav.Link><Link className="text-white" to="/subject" style={{ textDecoration: 'none' }}>Create New Subject</Link></Nav.Link>
      <Nav.Link><Link className="text-white " to="/student" style={{ textDecoration: 'none' }}>Add New Student</Link></Nav.Link>
      <Nav.Link><Link className="text-white " to="/student-list" style={{ textDecoration: 'none' }}>List Of Student</Link></Nav.Link>
      
      
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
</>
}

export default NavBar;