import Navbar from "../components/navbar";
import ReceiptTable from "../components/ReceiptTable";

import styles from "./receipts.module.scss";


export default function Receipts() {
	return (
		<div className="body">
			<Navbar />
			<div className="App">
				<div className={styles.table_container}>
					<ReceiptTable className={styles.table_parent}/>
				</div>

			</div>
		</div>
	);
}
