import React from "react";
import ReceiptRow from "./ReceiptRow";
import styles from "../pages/receipts.module.scss";

function ReceiptTable({ receipts }) {
	const renderRows = () => {
		return receipts.map((r) => {
			return <ReceiptRow receipt={r} />;
		});
	};

	return (
		<>
			<table className={styles.table_parent}>
				<caption className={styles.caption}>Past Receipts</caption>
				<thead>
					<tr>
						<th className={styles.header}>Vendor</th>
						<th className={styles.header}>Date</th>
						<th className={styles.header}>Total</th>
						<th className={styles.header}>Split?</th>
					</tr>
				</thead>
				<tbody>{renderRows()}</tbody>
			</table>
		</>
	);
}

export default ReceiptTable;
