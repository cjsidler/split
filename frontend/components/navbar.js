import Link from "next/link";

import { useEffect, useState } from "react";
import useStore from "../store/store";

export default function Navbar() {
	const [username, setUsername] = useState("");
	// Store current user in state here
	const isLoggedIn = useStore((state) => state.isLoggedIn);
	const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
	const setUserName = useStore((state) => state.setUserName);
	const setUserEmail = useStore((state) => state.setUserEmail);

	const getCredentials = () => {
		const user = localStorage.getItem("username");
		setUsername(user);
	};

	/*
		Move this fxn up to index.js eventually
	*/
	const logout = () => {
		// Remove token details from localStorage
		localStorage.clear();
		setIsLoggedIn(false);
		// Needs to actually update state too
	};

	useEffect(() => {
		// Check if localStorage has token that hasn't expired yet
		const exp = localStorage.getItem("exp");
		const currentDateTime = Date.now() / 1000;

		if (exp > currentDateTime) {
			// If token exists and is not expired, set global logged-in state to true
			setIsLoggedIn(true);
			setUserName(localStorage.getItem("username"));
			setUserEmail(localStorage.getItem("email"));

			getCredentials();
		} else {
			// If no token, no exp, or token expired, clear localStorage
			localStorage.clear();
		}
	}, []);

	return (
		<nav className="navbar-container">
			<li className="nav-item">
				<a href="/">Split</a>
			</li>

			<li className="nav-item">
				<a href="/upload">Upload</a>
			</li>

			<li className="nav-item">
				<a href="/receipts">Receipts</a>
			</li>

			{isLoggedIn ? null : (
				<li className="nav-item">
					<a href="/signup">Signup</a>
				</li>
			)}

			{isLoggedIn ? null : (
				<li className="nav-item">
					<a href="/login">Login</a>
				</li>
			)}

			<li className="nav-item">
				<a href="/about">About Us</a>
			</li>

			{isLoggedIn ? (
				<li className="nav-item">
					<p className="current_user">Logged in as {username}</p>
				</li>
			) : null}

			{isLoggedIn ? (
				<li className="nav-item" onClick={() => logout()}>
					<p className="logout">Logout</p>
				</li>
			) : null}
		</nav>
	);
}
