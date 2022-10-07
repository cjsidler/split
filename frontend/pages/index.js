import Head from "next/head";
import Navbar from "../components/navbar";

export default function Home() {
	return (
		<div className="container">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* <main>
				<App />
			</main> */}

			<div className="body">
				<Navbar />
				<div className="App">
					<div className="landing-image-banner"></div>
					<div className="welcome-text-container">
						<h1>Welcome to Split.</h1>
						<h3>This is the landing page</h3>
					</div>
				</div>
			</div>
		</div>
	);
}
