import "./index.scss";

export default function App() {
	return (
		<div className="body">
			<div className="App">
				<h1 className="title">
					Welcome to <a href="https://nextjs.org">Next.js!</a>
				</h1>
				<form className="login-form">
					<input placeholder="Username"></input>
					<input placeholder="Password"></input>
					<button>Login</button>
				</form>
			</div>
		</div>
	);
}
