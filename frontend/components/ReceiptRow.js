import React from "react";
import styles from "../pages/receipts.module.scss";

function ReceiptRow({ items }) {
    return (
        <>
            <tr className={styles.table_row}>
                <td className={styles.data_row}>Vendor</td>
                <td className={styles.data_row}>Date</td>
                <td className={styles.data_row}>Total</td>
                <td className={styles.data_row}>DELETE</td>
            </tr>
        </>
    )
};

export default ReceiptRow;