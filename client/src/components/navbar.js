import logo from './logo.png';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AboutModal from './/aboutmodal';

function HomeBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>

        <img src={logo} width = "40px" height = "40px" className="HeaderLogo" alt="logo" />
        
        <Navbar.Brand href="#"><h2> Movie Knight</h2></Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Nav>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Options" id="basic-nav-dropdown">

                <NavDropdown.Item> <AboutModal></AboutModal> </NavDropdown.Item>

              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

        </Nav>

      </Container>
    </Navbar>
  );
}

export default HomeBar;