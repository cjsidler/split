import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import useStore from "../store/store";
import axios from "axios";

import Navbar from "../components/navbar";
import ReceiptTable from "../components/ReceiptTable";
import Unauthorized from "../components/Unauthorized";
import styles from "./receipts.module.scss";

export default function Receipts() {
	const router = useRouter();
	const isLoggedIn = useStore((state) => state.isLoggedIn);

	const [receipts, setReceipts] = useState([]);
	const [error, setError] = useState("");

	const [username, setUsername] = useState("");

	const getCredentials = () => {
		const user = localStorage.getItem("username");
		setUsername(user);
	};

	const getReceipts = async () => {
		const response = await axios({
			method: "get",
			url: "http://localhost:8080/receipts",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});

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
		getCredentials();

		if (username) {
			getReceipts();
		}
	}, [username]);

	return (
		<div className="body">
			<Navbar />
			<div className="App">
				{error || !username ? (
					<div className={styles.error_container}>
						<Unauthorized />
					</div>
				) : (
					<div className={styles.table_container}>
						<ReceiptTable receipts={receipts} deleteReceipt={deleteReceipt} />
					</div>
				)}
			</div>
		</div>
	);
}
