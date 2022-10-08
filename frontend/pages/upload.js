import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import Navbar from "../components/navbar";
import styles from "./upload.module.scss";

export default function Upload() {
	const router = useRouter();

	const [file, setFile] = useState();
	const [fileChosen, setFileChosen] = useState(false);

	const handleChange = (e) => {
		setFile(e.target.files[0]);
		chooseFile();
	};

	const chooseFile = (e, val) => {
		setFileChosen(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		router.push("/addreceipt");
	};

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
								<button
									onClick={handleSubmit}
									type="submit"
									className={styles.upload_btn}>
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
								Choose a Receipt
							</label>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
