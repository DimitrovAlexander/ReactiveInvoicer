import { useState } from "react";
import { getApi } from "../../../../api/apiInstance";
import { useNavigate } from "react-router";

export function InterviewsTableRow({ interview, getData }) {
	const api = getApi();
	const navigate = useNavigate();

	function checkDate() {
		const today = new Date();
		const date = new Date(interview.interviewDate);

		return date < today ? false : true;
	}
	const datePassed = checkDate();

	
	function getRealAssessment(grade) {
		const mapp = new Map();
		mapp.set("Y", "Yes");
		mapp.set("I", "Yes with opinion");
		mapp.set("N", "No");

		return mapp.get(grade);
	}

	return (
		<tr>
			<th>{interview.interviewId}</th>
			<td>
				<div>
					Name: {interview.applicant.applicantName} {interview.applicant.applicantSurname} {interview.applicant.applicantLastname}
				</div>
				<div>Age: {interview.applicant.applicantAge}</div>
				<div>XP: {interview.applicant.applicantExperiance}</div>
			</td>
			<td>{interview.position.positionName}</td>
			<td className={`${datePassed ? "bg-green-300" : "bg-red-300"}`}>{interview.interviewDate}</td>
			<td>{getRealAssessment(interview.interviewAssessment)}</td>
			<td>
				{interview.appraisers.map((appraiser, index) => (
					<div key={`appraiser-${index}`}>
						{appraiser.employee?.emplName} {appraiser.employee?.emplLastname}
					</div>
				))}
			</td>
			<td>
				<button
					className={`btn`}
					onClick={() => {
						navigate(`/interviews/${interview.interviewId}`);
					}}
				>
					View
				</button>
			</td>
		</tr>
	);
}
