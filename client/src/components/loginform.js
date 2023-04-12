import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

function LoginForm() {
	
	// These are "Variables" (I think)

	// "React.useState is the deafault state of the variable on load, ie. the state of the password type is "password" AKA its hidden
	const [passwordType, setPasswordType] = React.useState("password"); // Password Type (text == visible, password == hidden)
	const [passwordInput, setPasswordInput] = React.useState("");
	const [username, setUsername] = React.useState("");

	// This function is called when the user hits the submit button
	const handleSubmit = (e) =>  {
		
		// DEBUG: 
		e.preventDefault(); // prevents page from relaoding
		//alert("Username: " + username  + "	Password: " + passwordInput); // displays stored values
		console.log("Username: " + username);
		console.log("Password: " + passwordInput);

		//  JSON to be passed to Express Server
		const jsonData =
		{
			username: username,
			password: passwordInput,   
		};

		// Runs /login route in the Express Server
		fetch("http://192.241.132.66:5000/record/login", 
		{
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(jsonData)
		})

		.then(response => response.json())
		.then(data => 
		{
		  // Grab the Result
		  console.log(data); // logs the JSON data received from the Express server
		})
		.catch(error =>  {
		  window.alert("Login Failed: Try Again Later");
		  return;
		});


		//alert("Account Found, Login Success!")
	  


		// CALL LOGIN API CALL HERE?

		// IF SUCESSFULL, GO TO LOGGED IN PAGE

		// IF NOT, ALERT THE USER
	}	

	// Updates Password when it has been changed
	const onPasswordChange = (e) => {
	  setPasswordInput(e.target.value);
	};

	
	// Updates Username when it has been changed
	const onUsernameChange = (e) => {
		setUsername(e.target.value);
	  };


	// This function does the toggle password visibility
	const toggle = () => {
	  if (passwordType === "password") {
		setPasswordType("text");
		return;
	  }
	  setPasswordType("password");
	};
	

	// This is the HTML code that is return when called by another files
	return (

		// The Login Form
		<Form onSubmit = {handleSubmit}>

			{/* Username Part */}
			<Form.Group className="mb-3" controlId="formBasicUsername" name ="formBasicUsername">
				<Form.Label>Username</Form.Label>

				<Form.Control 
				type="username" 
				placeholder="Username"
				value = {username}
				onChange = {onUsernameChange} />

			</Form.Group>

			{/* The Password Part */}
			<Form.Group className="mb-3" controlId="formBasicPassword" name ="formBasicPassword">
				<Form.Label>Password</Form.Label>

				<div className="input-group">
					
					{/* Password Input Field */}
					<input
					type={passwordType}
					onChange={onPasswordChange}
					value={passwordInput}
					placeholder="Password"
					name="password"
					className="form-control"
					/>

					{/* Toggle Password Visibility Button */}
					<button className="btn btn-primary" type = "button" onClick={toggle}>
					{passwordType === "password" ? (
						<svg
						width="20"
						height="17"
						fill="currentColor"
						className="bi bi-eye-slash-fill"
						viewBox="0 0 16 16"
						>
						<path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
						<path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
						</svg>
					) : (
						<svg
						width="20"
						height="17"
						fill="currentColor"
						className="bi bi-eye-fill"
						viewBox="0 0 16 16"
						>
						<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
						<path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
						</svg>
					)}
					</button>

				</div>
			</Form.Group>

			{/* The Login Button */}
			<Button variant="primary" type="submit">
				Login
			</Button>

	  	</Form>
	);
}

export default LoginForm;