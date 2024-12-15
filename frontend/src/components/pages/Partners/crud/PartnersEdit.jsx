import React, { useState, useEffect } from "react";
import { getApi } from "../../../../api/apiInstance";
import { useParams } from "react-router";
import { InvoicesTableRow } from "../../Invoices/table/InvoicesTableRow";

const PartnersEdit = () => {
	const api = getApi();
	const { id } = useParams();

	const [invoices, setInvoices] = useState([]);

	const [partnerEgn, setPartnerEgn] = useState("");
	const [partnerBulstat, setPartnerBulstat] = useState("");
	const [partnerName, setPartnerName] = useState("");
	const [partnerSurname, setPartnerSurname] = useState("");
	const [partnerLastname, setPartnerLastname] = useState("");
	const [partnerEmail, setPartnerEmail] = useState("");
	const [partnerPhone, setPartnerPhone] = useState("");
	const [partnerAddress, setPartnerAddress] = useState("");

	useEffect(() => {
		const loadPartner = async () => {
			try {
				const response = await api.get(`partners/${id}`);
				const data = response.data;

				setInvoices(data.invoices);

				setPartnerEgn(data.partnerEgn);
				setPartnerBulstat(data.partnerBulstat);
				setPartnerName(data.partnerName);
				setPartnerSurname(data.partnerSurname);
				setPartnerLastname(data.partnerLastname);
				setPartnerEmail(data.partnerEmail);
				setPartnerPhone(data.partnerPhone);
				setPartnerAddress(data.partnerAddress);
			} catch (error) {
				alert("Failed to load partner data: " + (error.response?.data|| "Unknown error"));
			}
		};

		loadPartner();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.put(`partners/${id}`, {
				partnerEgn: partnerEgn,
				partnerBulstat: partnerBulstat,
				partnerName: partnerName,
				partnerSurname: partnerSurname,
				partnerLastname: partnerLastname,
				partnerEmail: partnerEmail,
				partnerPhone: partnerPhone,
				partnerAddress: partnerAddress,
			});
		} catch (error) {
			alert(error.response?.data|| "Error updating partner");
		}
	};

	return (
		<div>
			<div className="overflow-x-auto">
				<table className="table table-zebra">
					<thead>
						<tr>
							<th>Id</th>
							<th>Invoice Info</th>
							<th>Invoice Date</th>
							<th>Payment due</th>
							<th>Payments Info</th>
							<th>Status</th>
							<th>Partner</th>
							<th>Add Payment</th>
							<th>Details</th>
							<th>Edit Invoice</th>
							<td></td>
						</tr>
					</thead>
					<tbody>
						{invoices.map((invoice, index) => {
							invoice.partnerName = `${partnerName} ${partnerSurname} ${partnerLastname}`;
							return <InvoicesTableRow key={`invoice-${index}`} invoice={invoice} getData={null} />;
						})}
					</tbody>
				</table>
			</div>
			<div className="flex justify-center items-center">
				<form className="flex flex-col items-center bg-base-200 p-6 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
					<h2 className="text-lg font-bold mb-4">Edit Partner</h2>
					<div>
						{!partnerBulstat && <input type="text" placeholder="EGN" value={partnerEgn} onChange={(e) => setPartnerEgn(e.target.value)} className="input input-bordered w-full" />}
						{!partnerEgn && <input type="text" placeholder="BULSTAT" value={partnerBulstat} onChange={(e) => setPartnerBulstat(e.target.value)} className="input input-bordered w-full" />}
						<input type="text" placeholder="First Name" value={partnerName} onChange={(e) => setPartnerName(e.target.value)} className="input input-bordered w-full" />
						<input type="text" placeholder="Surname" value={partnerSurname} onChange={(e) => setPartnerSurname(e.target.value)} className="input input-bordered w-full" />
						<input type="text" placeholder="Last Name" value={partnerLastname} onChange={(e) => setPartnerLastname(e.target.value)} className="input input-bordered w-full" />
						<input type="email" placeholder="Email" value={partnerEmail} onChange={(e) => setPartnerEmail(e.target.value)} className="input input-bordered w-full" />
						<input type="text" placeholder="Phone" value={partnerPhone} onChange={(e) => setPartnerPhone(e.target.value)} className="input input-bordered w-full" />
						<input type="text" placeholder="Address" value={partnerAddress} onChange={(e) => setPartnerAddress(e.target.value)} className="input input-bordered w-full" />
					</div>
					<button type="submit" className="btn btn-neutral w-full">
						Update Partner
					</button>
				</form>
			</div>
		</div>
	);
};

export default PartnersEdit;
