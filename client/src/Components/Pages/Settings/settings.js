import React, { useEffect } from 'react';

import './settngs.css';

import HomeBar from '../../../Components/navbar';
import HomeCard from '../../../Components/homecard';
import MainBar from '../../../Components/mainbar';
import MainTab from '../../../Components/maintab';
import SettingsBox from '../../../Components/settingsBox';
import Button from '../../../Components/colorButton';
import loadColor from '../../../Components/loadColor';

import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
//import './App.css';

// Import Toasts
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// var addC, removeC, extendC, bgC, ebgC; 

// This is the Settings Page of the Web Site
function Settings() {
    const navigate = useNavigate()

    const authToken = async (e) => {
        // Get JWT token (if it exists)
        const token = { token: localStorage.getItem('token') }

        // No Token --> Boot the User to Homepage
        if (token.token == null) { navigate('/home') }

        // JWT exists --> Authenticate Token
        try {
            // Send token to Express Server
            const url = "http://192.241.132.66:5000/auth";
            await axios.post(url, token).
                then(res => {
                    // Case: Bad JWT --> Boot user back to the homepage
                    if (res.status != 200) { navigate("/home") }

                    document.getElementById("signedInAs").innerHTML = "Signed in as: " + res.data.data.firstname + " " + res.data.data.lastname;


                });
        }

        catch (error) { console.log(error); }
    }

    

    // This is the function that is ran when the page is loaded for the first time
    useEffect(() => {

        authToken();

    }, []); // <-- empty array means 'run once'


    return (

        <div className="Settings">

            <MainBar />
            <SettingsBox>
                <Button left="30%" background-color="blue">
                    Hello
                </Button>

            </SettingsBox>
            <ToastContainer />

        </div>
    );
}

export default Main;