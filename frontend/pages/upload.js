import { useState, useEffect } from "react";

import Head from "next/head";

import Navbar from "../components/navbar";
import styles from "./upload.module.scss";

export default function Upload() {
	const [file, setFile] = useState();
	const [fileChosen, setFileChosen] = useState(false);

	const handleChange = (e) => {
		setFile(e.target.files[0]);
		chooseFile();
	};

	const chooseFile = (e, val) => {
		setFileChosen(true);
	};

	console.log("FILE: ", file);
	console.log("FILE CHOSEN: ", fileChosen);

	// useEffect(() => {}, [fileChosen]);

	return (
		<div className="container">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="body">
				<Navbar />
				<div className={styles.upload_screen_container}>
					<form className={styles.upload_form}>
						{fileChosen ? (
							<div className={styles.selected_file_container}>
								<h1>Selected File: </h1>
								<p>{file.name}</p>
								<button type="submit" className={styles.upload_btn}>
									Upload Receipt
								</button>
							</div>
						) : (
							<label for="file-upload" className={styles.custom_file_upload}>
								<input
									id="file-upload"
									className={styles.pick_file_btn}
									type="file"
									onChange={handleChange}
								/>
								Custom Upload
							</label>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
