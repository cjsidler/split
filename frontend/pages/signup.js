import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import jwt_decode from "jwt-decode";
import axios from "axios";

// import { signIn, signOut, useSession } from "next-auth/client";
// import GoogleProvider from "next-auth/providers/google";

import Navbar from "../components/navbar";

export default function Signup() {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const handleChange = (e) => {
		e.preventDefault();
		if (e.target.name == "username") {
			setUsername(e.target.value);
		} else if (e.target.name == "password") {
			setPassword(e.target.value);
		} else if (e.target.name == "email") {
			setEmail(e.target.value);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const credentials = {
			username: username,
			email: email,
			password: password,
		};

		const response = await axios({
			method: "POST",
			url: "http://localhost:8080/users/signup",
			data: credentials,
		});

		// Raw token
		const token = response.data.token;

		// Decode token
		const decoded = jwt_decode(token);

		// Save token contents to local storage for persistence
		localStorage.setItem("username", decoded.username);
		localStorage.setItem("email", decoded.email);
		localStorage.setItem("exp", decoded.exp);
		localStorage.setItem("iat", decoded.iat);

		router.push("/upload");
	};

	return (
		<div className="body">
			<Navbar />
			<div className="App">
				<h1 className="login-title">Signup for Split</h1>
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
						placeholder="Email"
						name="email"
						autoComplete="off"
						value={email}
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
					<button className="login-button">Signup</button>
				</form>
			</div>
		</div>
	);
}
