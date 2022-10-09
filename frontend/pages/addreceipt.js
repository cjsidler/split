import Navbar from "../components/navbar";

// Loading json to simulate API request
import data from "../data/result.json";

import styles from "./addreceipt.module.scss";

export default function Login() {
	const renderItems = () => {
		return data.line_items.map((item) => {
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

	return (
		<div className="body">
			<Navbar />
			<div className="App">
				<h1 className="login-title">Add Receipt</h1>

				<div className={styles.receipt_container}>
					<div className={styles.vendor_container}>
						<img src={data.img_thumbnail_url} alt="image" />
						<p>{data.vendor.name}</p>
						<p>{data.vendor.phone_number}</p>
						<p>{data.vendor.web}</p>
						<p>{data.vendor_type}</p>
					</div>

					<p>Payment: {data.payment_display_name}</p>
					<p>cashback: {data.cashback}</p>
					<p>category: {data.category}</p>
					<p>cashback: {data.cashback}</p>
					<p>created: {data.created}</p>
					<p>date: {data.date}</p>
					<p>invoice_number: {data.invoice_number}</p>
					<p>phone_number: {data.phone_number}</p>
					<p>subtotal: {data.subtotal}</p>
					<p>tax: {data.tax}</p>
					<p>total: {data.total}</p>

					<h1>Items</h1>

					{renderItems()}
				</div>
			</div>
		</div>
	);
}
