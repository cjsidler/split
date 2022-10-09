import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";

import Navbar from "../../components/navbar";
// Loading json to simulate API request
import styles from "../addreceipt.module.scss";

export default function Login() {
	const router = useRouter();
	const { receiptId } = router.query;

	const [receipt, setReceipt] = useState({});

	const renderItems = () => {
		return receipt.line_items.map((item) => {
			return (
				<div className={styles.item_container}>
					<p>Price: {item.total}</p>
					<p>Item: {item.description}</p>
					<p>Quantity: {item.quantity}</p>
					<p>Type: {item.type}</p>
				</div>
			);
		});
	};

	const getReceipt = async () => {
		console.log("RECEIPT ID: ", receiptId);
		const response = await axios({
			method: "get",
			url: `http://localhost:8080/receipts/${receiptId}`,
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});

		setReceipt(response.data);
	};

	useEffect(() => {
		// Only call API if receipId provided
		if (receiptId) {
			getReceipt();
		}
	}, [receiptId]);

	return (
		<div className="body">
			<Navbar />
			<div className="App">
				<h1 className="login-title">/receipts/{receiptId}</h1>
				{receipt.vendor ? (
					<div className={styles.receipt_container}>
						<div className={styles.vendor_container}>
							<img src={receipt.img_thumbnail_url} alt="image" />
							<p>{receipt.vendor.name}</p>
							<p>{receipt.vendor.address}</p>
						</div>

						<p>date: {receipt.date}</p>
						<p>subtotal: {receipt.subtotal}</p>
						<p>tax: {receipt.tax}</p>
						<p>total: {receipt.total}</p>

						<h1>Items</h1>

						{renderItems()}
					</div>
				) : null}
			</div>
		</div>
	);
}
