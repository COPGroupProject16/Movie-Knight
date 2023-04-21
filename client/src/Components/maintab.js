import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LoginForm from './Forms/loginform';
import SignupForm from './Forms/signupform';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MainTab() {
  return (
    <Container fluid className="justify-content-md-center" id = "mainTabs">
            <Row className="justify-content-md-center">
                <Col className="justify-content-md-center">
                    <Tabs
                    defaultActiveKey="login"
                    id="uncontrolled-tab-example"
                    className="mb-3 justify-content-md-center"
                    bg = "light"
                    fill
                    >
                        <Tab eventKey="login" title="Browse Movies">
                                <p>BROWSE TEST</p>
                        </Tab>

                        
                        <Tab eventKey="signup" title="My Reviews">
                                <p>MY REVIEWS TEST</p>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
    </Container>
  );
}

export default MainTab;