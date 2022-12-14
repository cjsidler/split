import React from "react";
import ReceiptRow from "./ReceiptRow";
import styles from "../pages/receipts.module.scss";

function ReceiptTable({ receipts, deleteReceipt }) {
	const renderRows = () => {
		return receipts.map((r) => {
			return <ReceiptRow receipt={r} deleteReceipt={deleteReceipt} />;
		});
	};

	return (
		<>
			<table className={styles.table_parent}>
				<caption className={styles.caption}>Past Receipts</caption>
				<thead>
					<tr>
						<th className={styles.header}></th>
						<th className={styles.header}>Vendor</th>
						<th className={styles.header}>Date</th>
						<th className={styles.header}>Total</th>
					</tr>
				</thead>
				<tbody>{renderRows()}</tbody>
			</table>
		</>
	);
}

export default ReceiptTable;
