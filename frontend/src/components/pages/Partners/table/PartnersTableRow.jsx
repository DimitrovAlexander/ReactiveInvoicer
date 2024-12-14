import { useNavigate } from "react-router";
import { getApi } from "../../../../api/apiInstance";

export function PartnersTableRow({ partner, getData }) {
	const api = getApi();
	const navigate = useNavigate();

	// Function to handle partner deletion
	async function deletePartner() {
		const confirmed = window.confirm(`Are you sure you want to delete the partner ${partner.clientName || partner.clientFullName}?`);

		if (!confirmed) return;

		try {
			await api.delete(`/Partners/${partner.partnerId}`);
			alert("Partner deleted successfully.");
			getData(); // Refresh the partners list
		} catch (error) {
			alert(`Error deleting partner: ${error.response?.data?.message || error.message}`);
		}
	}

	return (
		<tr>
			<th>{partner.partnerId}</th>
			<td>{partner.partnerEgn ? partner.partnerEgn : partner.partnerBulstat}</td>
			<td>{partner.partnerEgn ? "Individual" : "Business"}</td>
			<td>{partner.partnertFullname || "N/A"}</td>
			<td>{partner.partnerPhone || "N/A"}</td>
			<td>{partner.partnerAddress || "N/A"}</td>
			<td>{partner.partnerEmail || "N/A"}</td>
			<td>
				<button className="btn btn-neutral mr-2" onClick={() => navigate(`/partners/edit/${partner.partnerId}`)}>
					Edit
				</button>
				<button className="btn btn-error" onClick={deletePartner}>
					Delete
				</button>
			</td>
		</tr>
	);
}
