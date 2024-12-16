import { useEffect, useState } from "react";
import { getApi } from "../../../../api/apiInstance";
import { useNavigate, useParams } from "react-router";

export default function PartnerInvoiceCreate({}) {
	const api = getApi();
	const navigate = useNavigate();
    const { id } = useParams();
	const [selectedPartnerId, setSelectedPartnerId] = useState("");

	const [invoiceType, setInvoiceType] = useState("income");
	const [invoiceNo, setInvoiceNo] = useState("");
	const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().substring(0, 10));
	const [invoicePayableUntil, setInvoicePayableUntil] = useState(new Date().toISOString().substring(0, 10));
	const [invoiceValue, setInvoiceValue] = useState("");
	const [invoiceNote, setInvoiceNote] = useState("");

	async function createInvoice() {
		if (parseFloat(invoiceValue) <= 0) {
			alert("Invoice value must be greater than 0!");
			return;
		}

		try {
			await api.post(`Partners/${id}/invoices`, {
				partnerId: id,
				invoiceTypeId: invoiceType === "income" ? 1 : 2,
				invoiceNo,
				invoiceDate,
				payableUntil: invoicePayableUntil,
				invoiceValue,
				invoiceNote,
			});
            alert("Invoice added successfully!")
            navigate(-1)
		} catch (error) {
			alert(error.response?.data || "Error creating invoice");
		}
	}


	useEffect(() => {
		
	}, []);

	return (
		<div className="flex flex-col items-center">
			<div className="card bg-base-200 w-96">
				<div className="card-body">
					<h2 className="text-lg font-bold">Create New Invoice</h2>
					<select value={invoiceType} onChange={(e) => setInvoiceType(e.target.value)} className="select select-bordered w-full">
						<option value="income">Income</option>
						<option value="expense">Expense</option>
					</select>

					<input type="text" placeholder="Invoice Number" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} className="input input-bordered w-full" />

					<input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="input input-bordered w-full" />

					<input type="date" value={invoicePayableUntil} onChange={(e) => setInvoicePayableUntil(e.target.value)} className="input input-bordered w-full" />

					<input type="number" placeholder="Invoice Value" value={invoiceValue} onChange={(e) => setInvoiceValue(e.target.value)} className="input input-bordered w-full" />

					<textarea placeholder="Invoice Note" value={invoiceNote} onChange={(e) => setInvoiceNote(e.target.value)} className="textarea textarea-bordered w-full"></textarea>

					<button onClick={createInvoice} className="btn btn-neutral w-full mt-4">
						Create Invoice
					</button>
				</div>
			</div>
		</div>
	);
}
