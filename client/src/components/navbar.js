import logo from './Images/logo.png';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AboutModal from './/aboutmodal';

function HomeBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>

        <img src={logo} width = "40px" height = "40px" className="HeaderLogo" alt="logo" />
        
        <Navbar.Brand href="#"><h2> Movie Knight</h2></Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Nav>

          {/* Homepage Link */}
          <Navbar.Brand href="/home">Home</Navbar.Brand>

          {/* About Modal */}
          <Navbar.Brand> <AboutModal/> </Navbar.Brand>

        </Nav>

      </Container>
    </Navbar>
  );
}

export default HomeBar;