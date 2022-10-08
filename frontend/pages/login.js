import { useState, useEffect } from "react";

// import { signIn, signOut, useSession } from "next-auth/client";
// import GoogleProvider from "next-auth/providers/google";

import Navbar from "../components/navbar";

export default function Login() {
	return (
		<div className="body">
			<Navbar />
			<div className="App">
				<h1 className="login-title">Login to Split</h1>
				<form className="login-form">
					<input className="login-input" placeholder="Username"></input>
					<input className="login-input" placeholder="Password"></input>
					<button className="login-button">Login</button>
				</form>
			</div>
		</div>
	);
}
