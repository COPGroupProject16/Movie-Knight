import React, { useEffect } from 'react';

import './main.css';

import HomeBar from '../../../Components/navbar';  
import HomeCard from '../../../Components/homecard';  
import MainBar from '../../../Components/mainbar';
import MainTab from '../../../Components/maintab';
//import './App.css';

// Import Toasts
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// This is the Homepage of the Web Site
function Main() 
{
  // This is the function that is ran when the page is loaded for the first time
  useEffect(() => 
  {
    // Parse Browser Cookies
    const cookieID = document.cookie
    .split("; ")
    .find((row) => row.startsWith("id="))
    ?.split("=")[1];

    // If there is no cookie, (no user), then boot the user back to Homepage
    if(cookieID == undefined)
    {
      window.location = '/home';
      return;
    }

  }, []); // <-- empty array means 'run once'


  return (

    <div className="Main">

      <MainBar/>
      <MainTab/>
      <p>THIS IS THE Main PAGE</p>
      <ToastContainer/>
      
    </div>
  );
}
  
export default Main;