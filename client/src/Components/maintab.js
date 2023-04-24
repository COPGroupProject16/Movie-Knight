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
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import CardItem from "./cardItem"
import ReactDOM from 'react-dom/client';

import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function MainTab() {
  return (
    <Tabs
    defaultActiveKey="login"
    id="uncontrolled-tab-example"
    className="mb-3 justify-content-md-center"
    bg = "light"
    fill
    >
      {/* Browse Movies Tab */}
      <Tab eventKey="login" title="Browse Movies" id = '1'>
        <Col>
          <CardItem type = 'getAll'></CardItem>
        </Col>
      </Tab>

      {/* My Reviews Tab */}
      <Tab eventKey="signup" title="My Reviews">
        <Col>
          <CardItem type = 'getUserMovies' id = '1'></CardItem>
        </Col>
      </Tab>
    </Tabs>
  );
}

export default MainTab;