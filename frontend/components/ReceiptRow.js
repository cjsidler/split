import React from "react";
import Link from "next/link";
import axios from "axios";

import Modal from "react-modal";
import Dropdown from "react-dropdown";
import { FaTrashAlt } from "react-icons/fa";

import "react-dropdown/style.css";
import styles from "../pages/receipts.module.scss";

function ReceiptRow({ receipt, deleteReceipt }) {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [splitters, setSplitters] = React.useState(1);
	const [splitPrice, setSplitPrice] = React.useState(receipt.total);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const customStyles = {
		height: "50%",
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
		},
	};

	const options = [
		{ value: 1, label: 1 },
		{ value: 2, label: 2 },
		{ value: 3, label: 3 },
		{ value: 4, label: 4 },
		{ value: 5, label: 5 },
		{ value: 6, label: 6 },
		{ value: 7, label: 7 },
		{ value: 8, label: 8 },
		{ value: 9, label: 9 },
		{ value: 10, label: 10 },
		{ value: 11, label: 11 },
		{ value: 12, label: 12 },
		{ value: 13, label: 13 },
		{ value: 14, label: 14 },
		{ value: 15, label: 15 },
		{ value: 16, label: 16 },
		{ value: 17, label: 17 },
		{ value: 18, label: 18 },
		{ value: 19, label: 19 },
		{ value: 20, label: 20 },
	];

	const defaultOption = options[0];

	let handleChange = async (e) => {
		setSplitters(e.value);
		let newSplit = receipt.total/e.value;
		setSplitPrice(newSplit.toFixed(2));
	}

	return (
		<>
			<tr className={styles.table_row}>
				<td className={styles.data_row}>
					<Link href={`http://localhost:3000/receipts/${receipt._id}`}>
						{receipt.vendor.name}
					</Link>
				</td>
				<td className={styles.data_row}>{receipt.date}</td>
				<td className={styles.data_row}>{receipt.total}</td>
				{/* Will need to insert on click handler and pass the data from total*/}
				<td className={styles.data_row}>
					<button onClick={openModal}>Split</button>
				</td>
				<td className={styles.data_row}>
					<FaTrashAlt onClick={() => deleteReceipt(receipt._id)} />
				</td>
			</tr>
			<Modal
				style={customStyles}
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				contentLabel="Example Modal"
				ariaHideApp={false}>
				The split between{" "}
				<Dropdown
					options={options}
					onChange={handleChange}
					value={options[splitters - 1]}
					placeholder="Select an option"
				/>
				is ${splitPrice} per person!
			</Modal>
		</>
	);
}

export default ReceiptRow;
