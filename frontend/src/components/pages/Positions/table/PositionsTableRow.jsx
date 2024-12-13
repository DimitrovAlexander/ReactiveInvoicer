import axios from "axios";
import { useEffect, useState } from "react";
import { getApi } from "../../../../api/apiInstance";
import { useNavigate } from "react-router";

export default function PositionsTableRow({ position, getData }) {
	const api = getApi();
	const navigate = useNavigate();

	const [summary, setSummary] = useState("")

	async function getSummary() {
		const data = await api.get(`positions/${position.positionId}/summary`)
		setSummary(data.data)
	}
	useEffect(() => {
		getSummary()
	}, [])

	return (
		<tr>
			<th>{position.positionId}</th>
			<td>{position.positionName}</td>
			<td>Candidates: {summary.candidateCount} | Average Skill Assessment: {summary.averageSkillAssessment}</td>
			<td>
				<button
					className={`btn`}
					onClick={() => {
						navigate(`/positions/${position.positionId}`);
					}}
				>
					View
				</button>
			</td>
		</tr>
	);
}
