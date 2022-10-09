import { useRouter } from "next/router";
import useStore from "../store/store";
import axios from "axios";
import Unauthorized from "../components/Unauthorized";
import Navbar from "../components/navbar";
// Loading json to simulate API request
import styles from "./addreceipt.module.scss";

import data from "../data/result.json";
import { useEffect, useState } from "react";

export default function Login() {
    const isLoggedIn = useStore((state) => state.isLoggedIn);
    const receiptData = useStore((state) => state.receiptData);
    const setReceiptData = useStore((state) => state.setReceiptData);
    const router = useRouter();

    const [noReceiptDataAvail, setNoReceiptDataAvail] = useState(false);

    console.log({ receiptData });

    const renderItems = () => {
        return receiptData.line_items.map((item, i) => {
            return (
                <div className={styles.item_container} key={i}>
                    <p>Item: {item.description}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.total}</p>
                </div>
            );
        });
    };

    const saveReceipt = async (e) => {
        e.preventDefault();

        const response = await axios({
            method: "post",
            url: "http://localhost:8080/receipts",
            data: data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        localStorage.removeItem("receiptData");

        router.push("/receipts");
    };

    useEffect(() => {
        let receipt = localStorage.getItem("receiptData");
        if (receipt) {
            receipt = JSON.parse(receipt);
        }
        if (!receiptData) {
            if (receipt) {
                setReceiptData(receipt);
            } else {
                setNoReceiptDataAvail(true);
            }
        }
    }, []);

    return (
        <div className="body">
            <Navbar />
            {!isLoggedIn && (
                <div className={styles.error_container}>
                    <Unauthorized />
                </div>
            )}
            {noReceiptDataAvail && <div>Hmm...no receipt data available. Please try again.</div>}
            {isLoggedIn && receiptData && (
                <div className="App">
                    <h1 className="login-title">Review Receipt before saving</h1>

                    <div className={styles.receipt_container}>
                        <div className={styles.vendor_container}>
                            <img src={receiptData.img_url} alt="image" />
                            <p>{receiptData.vendor.name}</p>
                            <p>{receiptData.vendor.address}</p>
                        </div>

                        <p>Date: {receiptData.date}</p>

                        <h1>Items</h1>
                        {renderItems()}

                        <p>Tax: {receiptData.tax}</p>
                        <p>Subtotal: {receiptData.subtotal}</p>
                        <p>Tip: {receiptData.tip}</p>
                        <p>Total: {receiptData.total}</p>

                        <button className="save-receipt-btn" onClick={saveReceipt}>
                            Save Receipt
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
