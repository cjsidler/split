import Head from "next/head";
import Navbar from "../components/navbar";

export default function Home() {
	// Store current user in state here

	return (
		<div className="container">
			<Head>
				<title>Split</title>
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
						<p className="landing-text">
							Automating the tabsplitting process so you can focus on the
							important things
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
