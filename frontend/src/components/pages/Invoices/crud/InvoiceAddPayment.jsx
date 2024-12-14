import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getApi } from "../../../../api/apiInstance";

export default function InvoiceAddPayment() {
	const api = getApi();
	const navigate = useNavigate();
	const { id } = useParams(); // Получаваме ID на фактурата от URL

	const [invoice, setInvoice] = useState(null);
	const [paymentDate, setPaymentDate] = useState(new Date().toISOString().substring(0, 10));
	const [paymentValue, setPaymentValue] = useState("");

	// Зареждане на данните за фактурата
	async function loadInvoiceDetails() {
		try {
			const { data } = await api.get(`/Invoices/${id}`);
      console.log(data);
      
			setInvoice(data);
		} catch (error) {
			console.error("Error loading invoice:", error);
		}
	}

	// Регистриране на ново плащане
	async function registerPayment() {
		if (new Date(paymentDate) < new Date(invoice.invoiceDate)) {
			alert("Payment date cannot be earlier than the invoice date!");
			return;
		}

		if (parseFloat(paymentValue) <= 0) {
			alert("Payment value must be greater than 0!");
			return;
		}

		try {
			await api.post(`/Invoices/payment`, {
        invoiceId: id,
				paymentDate,
				paymentValue: parseFloat(paymentValue),
			});
			alert("Payment registered successfully.");
			navigate(-1); // Връщаме се към предишната страница
		} catch (error) {
			console.error("Error registering payment:", error);
			alert(error.response?.data|| "Error registering payment.");
		}
	}

	useEffect(() => {
		loadInvoiceDetails();
	}, [id]);

	if (!invoice) {
		return <div>Loading invoice details...</div>;
	}

	return (
		<div className="flex flex-col items-center">
			<div className="card bg-base-200 w-96">
				<div className="card-body">
					<h2 className="text-lg font-bold">Add Payment for Invoice #{invoice.invoiceNo}</h2>
					<p>Invoice Date: {new Date(invoice.invoiceDate).toDateString()}</p>
					<p>Invoice Value: {invoice.invoiceValue}</p>
					<p>Total Payments: {invoice.totalPayments}</p>
					<p>Remaining Balance: {invoice.invoiceValue - invoice.totalPayments}</p>

					<input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} className="input input-bordered w-full mt-4" />
					<input type="number" placeholder="Payment Value" value={paymentValue} onChange={(e) => setPaymentValue(e.target.value)} className="input input-bordered w-full mt-4" />

					<button onClick={registerPayment} className="btn btn-neutral w-full mt-4">
						Add Payment
					</button>
				</div>
			</div>
		</div>
	);
}
