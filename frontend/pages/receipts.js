import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import axios from "axios";

import Navbar from "../components/navbar";
import ReceiptTable from "../components/ReceiptTable";

import styles from "./receipts.module.scss";

export default function Receipts() {
	const router = useRouter();

	const [receipts, setReceipts] = useState([]);
	const [error, setError] = useState("");

	const [username, setUsername] = useState("");

	const getReceipts = async () => {
		const response = await axios({
			method: "get",
			url: "http://localhost:8080/receipts",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});

		console.log(response);

		// Error
		if (response.message) {
			setError(response.message);
		} else {
			setReceipts(response.data);
		}
	};

	const deleteReceipt = async (id) => {
		const response = await axios({
			method: "delete",
			url: `http://localhost:8080/receipts/${id}`,
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});

		// Remove receipt from state
		const updatedReceipts = receipts.filter((r) => {
			return r._id !== id;
		});

		setReceipts(updatedReceipts);
	};

	useEffect(() => {
		if (!username) {
			router.push("/login");
		}
	}, [username]);

	useEffect(() => {
		// only call api if loggedIn
		if (username) {
			getReceipts();
		}
	}, []);

	console.log(error);

	return (
		<div className="body">
			<Navbar />
			<div className="App">
				{error ? (
					<div>{error}</div>
				) : (
					<div className={styles.table_container}>
						<ReceiptTable receipts={receipts} deleteReceipt={deleteReceipt} />
					</div>
				)}
			</div>
		</div>
	);
}
