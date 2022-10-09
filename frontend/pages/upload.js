import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import FormData from "form-data";

import axios from "axios";

import Navbar from "../components/navbar";
import styles from "./upload.module.scss";

export default function Upload() {
	const router = useRouter();

	const [file, setFile] = useState();
	const [fileChosen, setFileChosen] = useState(false);

	const handleChange = (e) => {
		setFile(e.target.files[0]);
		setFileChosen(true);
	};

	/*
		Check credentials
	*/
	const getCredentials = () => {
		return localStorage.getItem("username");
	};

	// useEffect(() => {

	// }, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("file", file);

		const response = await axios({
			method: "post",
			url: "http://localhost:8080/upload_files",
			data: formData,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});

		console.log(response);

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
							<label
								htmlFor="file-upload"
								className={styles.custom_file_upload}>
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
