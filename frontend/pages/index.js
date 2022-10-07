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
					<h1> Welcome to Split. This is the landing page</h1>
				</div>
			</div>
		</div>
	);
}
