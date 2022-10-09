import { useState, useEffect } from "react";

import axios from "axios";

import Navbar from "../components/navbar";
import ReceiptTable from "../components/ReceiptTable";

import styles from "./receipts.module.scss";

export default function Receipts() {
	const [receipts, setReceipts] = useState([]);

	const getReceipts = async () => {
		const response = await axios({
			method: "get",
			url: "http://localhost:8080/receipts",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});

		setReceipts(response.data);
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
		getReceipts();
	}, []);

	return (
		<div className="body">
			<Navbar />
			<div className="App">
				<div className={styles.table_container}>
					<ReceiptTable receipts={receipts} deleteReceipt={deleteReceipt} />
				</div>
			</div>
		</div>
	);
}
