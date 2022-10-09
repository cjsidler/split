import Head from "next/head";
import { useEffect } from "react";
import Navbar from "../components/navbar";
import useStore from "../store/store";

export default function Home() {
    // Store current user in state here
    const isLoggedIn = useStore((state) => state.isLoggedIn);
    const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);

    console.log({ isLoggedIn });

    useEffect(() => {
        // Check if localStorage has token that hasn't expired yet
        const exp = localStorage.getItem("exp");
        const currentDateTime = Math.floor(Date.now() / 1000);

        if (exp && currentDateTime < exp) {
            setIsLoggedIn(true);
        } else if (exp && currentDateTime >= exp) {
            localStorage.clear();
        }

        // localStorage.removeItem("myCat");
        // If token is expired, clear out token from localStorage and don't set set isLoggedIn to true
    }, []);

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
                            Automating the tabsplitting process so you can focus on the important things
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
