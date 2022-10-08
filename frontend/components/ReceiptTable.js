import React from "react";
import ReceiptRow from "./ReceiptRow";

function ReceiptTable({ stores }) {
    return (
        <>
            <table>
                <caption>Past Receipts</caption>
                <thead>
                    <tr>
                        <th>Vendor</th>
                        <th>Date</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <ReceiptRow />
                </tbody>
            </table>
        </>
    )
};

export default ReceiptTable;