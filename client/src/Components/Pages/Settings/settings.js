import React, { useEffect } from 'react';

import './settings.css';
import HomeBar from '../../../Components/navbar';
import HomeCard from '../../../Components/homecard';
import MainBar from '../../../Components/mainbar';
import MainTab from '../../../Components/maintab';
import SettingsBox from '../../../Components/settingsBox';
import ColorButton from '../../../Components/colorButton';
import loadColor from '../../../Components/loadColor';

import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
//import './App.css';

// Import Toasts
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react"; 


export const ThemeContext = createContext(null)

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

    // We need to add the API Call to grab the color right here
    // const [theme, loadColor] = useState("light")

    /* const toggleTheme = () => {
        // We need an API Call here too     
        loadColor(apiResult);
    } */ 

    return (
        //<ThemeContext.Provider value={{theme, toggleTheme}}>
            <div className="Settings">
                <MainBar />
                <SettingsBox>
                </SettingsBox>
                <ToastContainer />

            </div>
        //</ThemeContext.Provider>
    );
}

export default Settings;
