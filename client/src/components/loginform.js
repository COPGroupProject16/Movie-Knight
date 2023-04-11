import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

function LoginForm() {
	
	const [password, setPasswordValue] = React.useState("password");
	const [passwordInput, setPasswordInput] = React.useState("");
	const onPasswordChange = (e) => {
	  setPasswordInput(e.target.value);
	};
	const toggle = () => {
	  if (password === "password") {
		setPasswordValue("text");
		return;
	  }
	  setPasswordValue("password");
	};
	
	return (

		<Form>

			<Form.Group className="mb-3" controlId="formBasicUsername" name ="formBasicUsername">
				<Form.Label>Username</Form.Label>
				<Form.Control type="username" placeholder="Username" />
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicPassword" name ="formBasicPassword">
				<Form.Label>Password</Form.Label>

				<div className="input-group">
					<input
					type={password}
					onChange={onPasswordChange}
					value={passwordInput}
					placeholder="Password"
					name="password"
					className="form-control"
					/>
					<button className="btn btn-primary" type = "button" onClick={toggle}>
					{password === "password" ? (
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

			<Button variant="primary" type="submit">
				Login
			</Button>

	  	</Form>
	);
}

export default LoginForm;