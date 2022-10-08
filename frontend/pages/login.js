import { useState, useEffect } from "react";
import axios from "axios";

// import { signIn, signOut, useSession } from "next-auth/client";
// import GoogleProvider from "next-auth/providers/google";

import Navbar from "../components/navbar";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleChange = (e) => {
		e.preventDefault();
		if (e.target.name == "username") {
			setUsername(e.target.value);
		} else if (e.target.name == "password") {
			setPassword(e.target.value);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const credentials = { username: username, password: password };

		const response = await axios({
			method: "POST",
			url: "http://localhost:8080/users/login",
			data: credentials,
		});

		console.log(response);
	};

	return (
		<div className="body">
			<Navbar />
			<div className="App">
				<h1 className="login-title">Login to Split</h1>
				<form
					className="login-form"
					onSubmit={(e) => handleSubmit(e)}
					autoComplete="new-password">
					<input
						onChange={handleChange}
						className="login-input"
						placeholder="Username"
						name="username"
						autoComplete="off"
						value={username}
					/>
					<input
						onChange={handleChange}
						className="login-input"
						placeholder="Password"
						name="password"
						type="password"
						autoComplete="off"
						value={password}
					/>
					<button className="login-button">Login</button>
				</form>
			</div>
		</div>
	);
}
