import Link from "next/link";

export default function Navbar() {
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

			<li className="nav-item">
				<a href="/login">Login</a>
			</li>

			<li className="nav-item">
				<a href="/about">About Us</a>
			</li>
		</nav>
	);
}
