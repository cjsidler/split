import { useRouter } from "next/router";
import useStore from "../store/store";
import axios from "axios";
import Unauthorized from "../components/Unauthorized";
import Navbar from "../components/navbar";
// Loading json to simulate API request
import styles from "./addreceipt.module.scss";

import data from "../data/result.json";

export default function AddReceipt() {
    const isLoggedIn = useStore((state) => state.isLoggedIn);
    const router = useRouter();

    const renderItems = () => {
        return data.line_items.map((item) => {
            return (
                <div className={styles.item_container}>
                    <p style={{ flexBasis: "50%" }}>Item: {item.description}</p>
                    <p style={{ flexBasis: "15%" }}>Quantity: {item.quantity}</p>
                    <p style={{ flexBasis: "15%" }}>Price: {item.total}</p>
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

        router.push("/receipts");
    };

    return (
        <div className="body">
            <Navbar />
            {!isLoggedIn && (
                <div className={styles.error_container}>
                    <Unauthorized />
                </div>
            )}
            {isLoggedIn && (
                <div className="App">
                    <h1 className="login-title">Add Receipt</h1>

                    <div className={styles.receipt_container}>
                        <div className={styles.vendor_container}>
                            <img src={data.img_url} alt="image" />
                            <p>{data.vendor.name}</p>
                            <p>{data.vendor.address}</p>
                            <p>{data.vendor.phone_number}</p>
                        </div>

                        <p>Date: {data.date}</p>

                        <h1>Items</h1>
                        {renderItems()}

                        <div className={styles.totals_container}>
                            <p>Tax: {data.tax}</p>
                            <p>Subtotal: {data.subtotal}</p>
                            <p>Tip: {data.tip}</p>
                            <p>Total: {data.total}</p>
                        </div>

                        <button className="save-receipt-btn" onClick={saveReceipt}>
                            Save Receipt
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
