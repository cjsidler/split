import Image from "next/image";
import Navbar from "../components/navbar";

export default function Login() {
	return (
		<div className="body">
			<Navbar />
			<div className="App">
				<div className="about-image-banner"></div>
				<div className="welcome-text-container">
					<h1>About Us</h1>
				</div>

				<div className="about-text-container">
					<p className="about-text">
						Founded by a group of OSU students during Oregon State's annual Fall
						2022 Beaverhacks Hackathon who saw a need for improving the tab
						splitting process when with friends. The theme for this hackathon
						was "Life Hacks".
					</p>
				</div>

				<h1 className="about-students-title">Who we are</h1>

				<div className="students-container">
					<div className="student-container">
						<img
							className="profile_img"
							src="/stephen_profile.jpg"
							alt="stephen_img"
						/>
						<div className="student-about-container">
							<h3>Stephen Chow</h3>
							<p>
								Biotechnology professional. 2nd year in Oregon State's CS
								program.
							</p>
						</div>
					</div>

					<hr />

					<div className="student-container">
						<img
							className="profile_img"
							src="/matt_profile.jpeg"
							alt="stephen_img"
						/>
						<div className="student-about-container">
							<h3>Matthew Lam</h3>
							<p>Tax extraordinaire turned Software Engineer</p>
						</div>
					</div>

					<hr />

					<hr />

					<div className="student-container">
						<img
							className="profile_img"
							src="/collin_profile.jpeg"
							alt="stephen_img"
						/>
						<div className="student-about-container">
							<h3>Collin Sidler</h3>
							<p>
								CPA turned Computer Science student based in the Orange County,
								CA area. Final quarter in the program.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
