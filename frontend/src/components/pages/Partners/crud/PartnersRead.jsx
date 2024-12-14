import { useEffect, useState } from "react";
import axios from "axios"; // Добавяме Axios библиотеката
import { PartnersTableRow } from "../table/PartnersTableRow";

export default function PartnersRead() {
	const api = axios.create({
		baseURL: "https://localhost:7024/api", // Заменете с вашия API URL
		headers: {
			"Content-Type": "application/json",
		},
	});

	const [partners, setPartners] = useState([]);

	// Филтри за търсене
	const [partnerEgn, setEgn] = useState("");
	const [partnerBulstat, setBulstat] = useState("");
	const [clientType, setClientType] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [partnerName, setPartnerName] = useState("");
	const [partnerEmail, setPartnerEmail] = useState("");

	// Зареждане на всички контрагенти
	async function getData() {
		try {
			const response = await api.get("/Partners");
			console.log(response.data);

			setPartners(response.data);
		} catch (error) {
			console.error("Error fetching partners:", error);
		}
	}

	/* 
partnerAddress
partnerBulstat
partnerEgn
partnerEmail
partnerId
partnerPhone
partnertFullname
*/

	// Търсене на контрагенти
	async function findPartners() {
		partnerEgn && setPartners(partners.filter((x) => x.partnerEgn == partnerEgn));
		partnerEmail && setPartners(partners.filter((x) => x.partnerEmail == partnerEmail));
		partnerName && setPartners(partners.filter((x) => x.partnertFullname == partnerName));
		address && setPartners(partners.filter((x) => x.partnerAddress == address));
		phone && setPartners(partners.filter((x) => x.partnerPhone == phone));
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<div className="card bg-base-200">
				<div className="card-body flex flex-row flex-wrap gap-4">
					<input value={partnerEgn} onChange={(e) => setEgn(e.target.value)} placeholder="EGN" className="input input-bordered" />
					<input value={partnerBulstat} onChange={(e) => setBulstat(e.target.value)} placeholder="BULSTAT" className="input input-bordered" />
					<select value={clientType} onChange={(e) => setClientType(e.target.value)} className="select select-bordered">
						<option value="">Select Client Type</option>
						<option value="individual">Individual</option>
						<option value="business">Business</option>
					</select>
					<input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="input input-bordered" />
					<input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="input input-bordered" />
					<input value={partnerName} onChange={(e) => setPartnerName(e.target.value)} placeholder="Full Name (First, Middle, Last)" className="input input-bordered" />
					<input type="email" value={partnerEmail} onChange={(e) => setPartnerEmail(e.target.value)} placeholder="Email" className="input input-bordered" />

					<button onClick={findPartners} className="btn btn-neutral">
						Find
					</button>
					<button onClick={getData} className="btn btn-neutral">
						All
					</button>
				</div>
			</div>
			<div className="overflow-x-auto">
				<table className="table table-zebra">
					<thead>
						<tr>
							<th>Id</th>
							<th>EGN</th>
							<th>BULSTAT</th>
							<th>Client Type</th>
							<th>Client Name</th>
							<th>Phone number</th>
							<th>Address</th>
							<th>Email</th>
							<th>Edit Partner</th>
							<td></td>
						</tr>
					</thead>
					<tbody>
						{partners.map((partner, index) => (
							<PartnersTableRow key={`partner-${index}`} partner={partner} getData={getData} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
