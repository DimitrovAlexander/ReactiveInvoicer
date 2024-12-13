import axios from "axios";
import { useEffect, useState } from "react";
import { InterviewsTableRow } from "../table/InterviewsTableRow";
import { getApi } from "../../../../api/apiInstance";

export default function InterviewsRead() {
	const api = getApi();

	const [interviews, setInterviews] = useState([]);

	const [interviewDate, setInterviewDate] = useState("");
	const [applicantFname, setApplicantFname] = useState("");
	const [applicantSname, setApplicantSname] = useState("");
	const [applicantLname, setApplicantLname] = useState("");
	const [position, setPosition] = useState("");

	async function getData() {
		const data = await api.get("Interviews");
		setInterviews(data.data);
	}
	async function findInterview() {
		interviewDate && setInterviews(interviews.filter((x) => x.interviewDate == interviewDate));
		position && setInterviews(interviews.filter((x) => x.position.positionName == position));
		applicantFname && setInterviews(interviews.filter((x) => x.applicant.applicantName == applicantFname));
		applicantSname && setInterviews(interviews.filter((x) => x.applicant.applicantSurname == applicantSname));
		applicantLname && setInterviews(interviews.filter((x) => x.applicant.applicantLastname == applicantLname));
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<div className="card bg-base-200">
				<div className="card-body flex flex-row flex-wrap">
					<input
						defaultValue={interviewDate}
						onChange={(e) => {
							setInterviewDate(e.target.value);
						}}
						placeholder="Date"
						className="input input-bordered"
					/>
					<input
						defaultValue={applicantFname}
						onChange={(e) => {
							setApplicantFname(e.target.value);
						}}
						placeholder="First Name"
						className="input input-bordered"
					/>
					<input
						defaultValue={applicantSname}
						onChange={(e) => {
							setApplicantSname(e.target.value);
						}}
						placeholder="Middle Name"
						className="input input-bordered"
					/>
					<input
						defaultValue={applicantLname}
						onChange={(e) => {
							setApplicantLname(e.target.value);
						}}
						placeholder="Last Name"
						className="input input-bordered"
					/>
					<input
						defaultValue={position}
						onChange={(e) => {
							setPosition(e.target.value);
						}}
						placeholder="Position"
						className="input input-bordered"
					/>

					<button onClick={findInterview} className="btn btn-neutral">
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
							<th>Applicant</th>
							<th>Position</th>
							<th>Date</th>
							<th>Assessment</th>
							<th>Appraisers</th>
							<td></td>
						</tr>
					</thead>
					<tbody>
						{interviews.map((interview, index) => (
							<InterviewsTableRow key={`interview-${index}`} interview={interview} getData={getData} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
