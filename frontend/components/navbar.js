import Link from "next/link";

export default function Navbar() {
    /*
		Move this fxn up to index.js eventually
	*/
    const logout = () => {
        // Remove token details from localStorage
        localStorage.clear();

        console.log("Logging out");

        // Needs to actually update state too
    };

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
                <a href="/signup">Signup</a>
            </li>

            <li className="nav-item">
                <a href="/login">Login</a>
            </li>

            <li className="nav-item">
                <a href="/about">About Us</a>
            </li>

            <li className="nav-item" onClick={() => logout()}>
                <p className="logout">Logout</p>
            </li>
        </nav>
    );
}
