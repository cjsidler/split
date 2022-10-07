import "./index.scss";

export default function App() {
	return (
		<div className="body">
			<div className="App">
				<nav className="navbar-container">
					<li className="nav-item">Split</li>
					<li className="nav-item">Receipts</li>
					<li className="nav-item">Login</li>
					<li className="nav-item">About Us</li>
				</nav>
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
