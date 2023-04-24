import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';

// Import Toasts
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import {Link, useNavigate} from 'react-router-dom';

import axios from "axios";

function MovieModal(props) {
  const [show, setShow] = useState(false);
  const [rating, setRating] = React.useState("");
  const navigate = useNavigate()

  const onRatingChange = (e) => { setRating(e.target.value); };
  const handleClose = () => {setShow(false); setRating("");}
  const handleShow = () => setShow(true);

  const handleSubmit = async(e) =>
  {
    // Get JWT token (if it exists)
    const token =  { token: localStorage.getItem('token') }

    // No Token --> Boot the User to Homepage
    if( token.token == null) { navigate('/home') }

    // JWT exists --> Authenticate Token
    try 
    {
        // Send token to Express Server
        const url = "http://192.241.132.66:5000/auth";
        await axios.post(url,token).
        then(async res=>
        {
            // Case: Bad JWT --> Boot user back to the homepage
            if (res.status != 200) { navigate("/home") }

            // GOOD JWT --> ADD REVIEW
            try 
            {
                const json = 
                {
                    userID : res.data.data._id,
                    movieID : props.id,
                    rating: rating
                } 

                console.log(json);

                // Send token to Express Server
                const url = "http://192.241.132.66:5000/addReview";
                await axios.post(url,json).
                then(res=>
                {
                    //console.log(res);
                    //console.log(res.data);

                    toast.success("Review Added!", 
                    {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1000
                    });

                    //console.log(res.data.data);
                    handleClose();

                });
            } 

            catch (error) 
            { 
                console.log(error.response.data.message); 
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000
                });
            }
        })
    } 

    catch (error) { console.log(error); }
    }

   if(props.type == 'browse')
   {
    return (
        <>
          <Dropdown.Item onClick={handleShow}>Add Review</Dropdown.Item>
    
    
          <Modal show={show} onHide={handleClose}>
    
            <Modal.Header className = "text-center" closeButton>
              <Modal.Title className = "text-center">
                {props.title}
              </Modal.Title>
            </Modal.Header>
    
            <Modal.Body className = "text-center" id = 'rating'>            
                <p>Title: {props.title}</p>
                <p>Genre: {props.genre}</p>
                <p>Director: {props.director}</p>
                <p>Year: {props.year}</p>
    
            <Modal.Title className = "text-center">
                Your Rating:  {rating}/10
            </Modal.Title>
            
            {/* 1-10 Rating Buttons */}
            <div>
                <Button variant="danger" value = '0' onClick = {onRatingChange}>
                    0
                </Button>
    
                <Button variant="danger" value = '1' onClick = {onRatingChange}>
                    1
                </Button>
    
                <Button variant="danger" value = '2' onClick = {onRatingChange}>
                    2
                </Button>
    
                <Button variant="danger" value = '3' onClick = {onRatingChange}>
                    3
                </Button>
    
                <Button variant="warning" value = '4' onClick = {onRatingChange}>
                    4
                </Button>
    
                <Button variant="warning" value = '5' onClick = {onRatingChange}>
                    5
                </Button>
    
                <Button variant="warning" value = '6' onClick = {onRatingChange}>
                    6
                </Button>
    
                <Button variant="primary" value = '7' onClick = {onRatingChange}>
                    7
                </Button>
    
                <Button variant="success" value = '8' onClick = {onRatingChange}>
                    8
                </Button>
    
                <Button variant="success" value = '9' onClick = {onRatingChange}>
                    9
                </Button>
    
                <Button variant="success" value = '10' onClick = {onRatingChange}>
                    10
                </Button>
            </div>
    
            </Modal.Body>
    
            <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit}>
                Add Review
              </Button>
              <Button variant="danger" onClick={handleClose}>
                Cancel
              </Button>
            </Modal.Footer>
    
            <ToastContainer />
    
          </Modal>
        </>
      );
   } 


   if(props.type == 'myReviews')
   {
    return (
        <>
          <Dropdown.Item onClick={handleShow}>Edit Review</Dropdown.Item>
    
    
          <Modal show={show} onHide={handleClose}>
    
            <Modal.Header className = "text-center" closeButton>
              <Modal.Title className = "text-center">
                {props.title}
              </Modal.Title>
            </Modal.Header>
    
            <Modal.Body className = "text-center" id = 'rating'>            
                <p>Title: {props.title}</p>
                <p>Genre: {props.genre}</p>
                <p>Director: {props.director}</p>
                <p>Year: {props.year}</p>
    
            <Modal.Title className = "text-center">
                Your Rating:  {rating}/10
            </Modal.Title>
            
            {/* 1-10 Rating Buttons */}
            <div>
                <Button variant="danger" value = '0' onClick = {onRatingChange}>
                    0
                </Button>
    
                <Button variant="danger" value = '1' onClick = {onRatingChange}>
                    1
                </Button>
    
                <Button variant="danger" value = '2' onClick = {onRatingChange}>
                    2
                </Button>
    
                <Button variant="danger" value = '3' onClick = {onRatingChange}>
                    3
                </Button>
    
                <Button variant="warning" value = '4' onClick = {onRatingChange}>
                    4
                </Button>
    
                <Button variant="warning" value = '5' onClick = {onRatingChange}>
                    5
                </Button>
    
                <Button variant="warning" value = '6' onClick = {onRatingChange}>
                    6
                </Button>
    
                <Button variant="primary" value = '7' onClick = {onRatingChange}>
                    7
                </Button>
    
                <Button variant="success" value = '8' onClick = {onRatingChange}>
                    8
                </Button>
    
                <Button variant="success" value = '9' onClick = {onRatingChange}>
                    9
                </Button>
    
                <Button variant="success" value = '10' onClick = {onRatingChange}>
                    10
                </Button>
            </div>
    
            </Modal.Body>
    
            <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit}>
                Add Review
              </Button>
              <Button variant="danger" onClick={handleClose}>
                Cancel
              </Button>
            </Modal.Footer>
    
            <ToastContainer />
    
          </Modal>
        </>
      );
   } 

}

export default MovieModal;