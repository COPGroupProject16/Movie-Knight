import React, { useEffect } from 'react';

import HomeBar from '../../../Components/navbar';  
import HomeCard from '../../../Components/homecard';  
//import './App.css';

// Import Toasts
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// This is the Homepage of the Web Site
function Main() 
{
  // Read in Cookie Details, send them back to '/home' if there are no valid cookies
  function readCookie()
  {
    let firstName = '';
    let lastName = '';
    let id = '';
    let data = document.cookie;
    let splits = data.split(";");

    for(var i = 0; i < splits.length; i++) 
    {
      let thisOne = splits[i].trim();
      let tokens = thisOne.split("=");

      if( tokens[0] == "firstName" )
      {
        firstName = tokens[1];
      }
      else if( tokens[0] == "lastName" )
      {
        lastName = tokens[1];
      }
      else if( tokens[0] == "userId" )
      {
        id = parseInt( tokens[1].trim() );
      }
    }

      // If there is no cookie AKA no user is signed in --> go to login page (index.html)
    //if( userId < 0 ) { window.location.href = "index.html";}
    if (document.cookie.indexOf('id') == undefined ) { window.location = '/home'; }

      // If there IS a saved user cookie --> go to home page (main.html)
      else 
    { 

    }	
  }


  // This is the function that is ran when the page is loaded for the first time
  useEffect(() => 
  {
    const cookieID = document.cookie
    .split("; ")
    .find((row) => row.startsWith("id="))
    ?.split("=")[1];

    if(cookieID == undefined)
    {
      window.location = '/home';
      return;
    }

    const cookies = document.cookie.split("; ");
    const cookieFirst = cookies.find((row) => row.startsWith("firstName=")).split("=")[1];
    const cookieLast = cookies.find((row) => row.startsWith("lastName=")).split("=")[1];

    myFunction(cookieFirst, cookieLast);

  }, []); // <-- empty array means 'run once'

	const myFunction = (name1, name2) => 
  {

		toast.success("Hello " + name1 + ", " + name2, {
			position: toast.POSITION.TOP_CENTER
		});
	};


  return (

    <div className="Main">

      <p>THIS IS THE Main PAGE</p>
      <ToastContainer/>
      
    </div>
  );
}
  
export default Main;