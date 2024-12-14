import { useEffect, useState } from "react";
import { getApi } from "../../../../api/apiInstance";
import { useNavigate, useParams } from "react-router";

export default function InvoiceEdit() {
    const api = getApi();
    const navigate = useNavigate();
    const { id } = useParams();
    const [invoiceType, setInvoiceType] = useState("income");
    const [invoiceNo, setInvoiceNo] = useState("");
    const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().substring(0, 10));
    const [invoicePayableUntil, setInvoicePayableUntil] = useState(new Date().toISOString().substring(0, 10));
    const [invoiceValue, setInvoiceValue] = useState("");
    const [invoiceNote, setInvoiceNote] = useState("");

    async function loadInvoice() {
        try {
            const response = await api.get(`invoices/${id}`);
            const invoice = response.data;

            console.log(invoice)

            setInvoiceType(invoice.invoiceTypeId === 1 ? "income" : "expense");
            setInvoiceNo(invoice.invoiceNo);
            setInvoiceDate(invoice.invoiceDate?.substring(0, 10));
            setInvoicePayableUntil(invoice.invoicePayableUntil?.substring(0, 10));
            setInvoiceValue(invoice.invoiceValue);
            setInvoiceNote(invoice.invoiceNote);
        } catch (error) {
            console.log(error);
            
            alert("Failed to load invoice data: " + error.response?.data?.message || "Unknown error");
        }
    }

    async function updateInvoice() {
        if (parseFloat(invoiceValue) <= 0) {
            alert("Invoice value must be greater than 0!");
            return;
        }

        try {
            await api.put(`invoices/${id}`, {
                invoiceTypeId: invoiceType === "income" ? 1 : 2,
                invoiceNo,
                invoiceDate,
                payableUntil: invoicePayableUntil,
                invoiceValue,
                invoiceNote,
            });
            alert("Invoice updated successfully!");
            
        } catch (error) {
            console.log(error.response.data)
            alert(error.response?.data || "Error updating invoice");
        }
    }

    useEffect(() => {
        loadInvoice();
    }, [id]);

    return (
        <div className="flex flex-col items-center">
            <div className="card bg-base-200 w-96">
                <div className="card-body">
                    <h2 className="text-lg font-bold">Edit Invoice</h2>
                    <select value={invoiceType} onChange={(e) => setInvoiceType(e.target.value)} className="select select-bordered w-full">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Invoice Number"
                        value={invoiceNo}
                        onChange={(e) => setInvoiceNo(e.target.value)}
                        className="input input-bordered w-full"
                    />

                    <input
                        type="date"
                        value={invoiceDate}
                        onChange={(e) => setInvoiceDate(e.target.value)}
                        className="input input-bordered w-full"
                    />

                    <input
                        type="date"
                        value={invoicePayableUntil}
                        onChange={(e) => setInvoicePayableUntil(e.target.value)}
                        className="input input-bordered w-full"
                    />

                    <input
                        type="number"
                        placeholder="Invoice Value"
                        value={invoiceValue}
                        onChange={(e) => setInvoiceValue(e.target.value)}
                        className="input input-bordered w-full"
                    />

                    <textarea
                        placeholder="Invoice Note"
                        value={invoiceNote}
                        onChange={(e) => setInvoiceNote(e.target.value)}
                        className="textarea textarea-bordered w-full"
                    ></textarea>

                    <button onClick={updateInvoice} className="btn btn-neutral w-full mt-4">
                        Update Invoice
                    </button>
                </div>
            </div>
        </div>
    );
}
