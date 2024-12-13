import { useEffect, useState } from "react";
import { getApi } from "../../../../api/apiInstance";

export default function InterviewsCreate({ refresh }) {
	const api = getApi();

	const [positions, setPositions] = useState([]);
	const [employees, setEmployees] = useState([]);

	const [position, setPosition] = useState();
	const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
	const [applicantEgn, setApplicantEgn] = useState("0000000000");
	const [applicantFname, setApplicantFname] = useState();
	const [applicantSname, setApplicantSname] = useState();
	const [applicantLname, setApplicantLname] = useState();
	const [applicantAge, setApplicantAge] = useState();
	const [applicantExperiance, setApplicantExperiance] = useState();
	const [firstEmployee, setFirstEmployee] = useState();
	const [secondEmployee, setSecondEmployee] = useState();
	const [thirdEmployee, setThirdEmployee] = useState();

	async function addInterview() {
		if (!checkEgn()) {
			alert("Egn must be only numbers!");
			return;
		}

		try {
			await api.post("Interviews", {
				positionId: position,
				applicant: {
					applicantEgn: applicantEgn,
					applicantName: applicantFname,
					applicantSurname: applicantSname,
					applicantLastname: applicantLname,
					applicantAge: applicantAge,
					applicantExperiance: applicantExperiance,
				},
				interviewDate: date,
				employeeIds: [firstEmployee, secondEmployee, thirdEmployee],
			});
			refresh();
		} catch (error) {
			alert(error.response.data.message);
		}
	}

	async function getPositions() {
		const data = await api.get("Positions");
		setPositions(data.data);
		setPosition(data.data[0].positionId);
	}
	async function getEmployees() {
		const data = await api.get("Employees");
		setEmployees(data.data);
		setFirstEmployee(data.data[0].emplId);
		setSecondEmployee(data.data[1].emplId);
		setThirdEmployee(data.data[2].emplId);
	}

	function checkEgn() {
		return !isNaN(applicantEgn);
	}

	useEffect(() => {
		getPositions();
		getEmployees();
	}, []);

	return (
		<div>
			<div className="card bg-base-200 w-80">
				<div className="card-body">
					<select
						onChange={(e) => {
							setPosition(e.target.value);
						}}
						defaultValue={position}
						className="select select-bordered w-full max-w-xs"
					>
						{positions.map((p, index) => (
							<option key={`position-${index}`} value={p.positionId}>
								{p.positionName}
							</option>
						))}
					</select>
					<input
						value={date}
						onChange={(e) => {
							setDate(e.target.value);
						}}
						type="date"
						placeholder="Date"
						className="input input-bordered"
					/>
					<input
						defaultValue={applicantEgn}
						onChange={(e) => {
							setApplicantEgn(e.target.value);
						}}
						placeholder="Egn"
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
						defaultValue={applicantAge}
						onChange={(e) => {
							setApplicantAge(e.target.value);
						}}
						placeholder="Age"
						type="number"
						className="input input-bordered"
					/>
					<input
						defaultValue={applicantExperiance}
						onChange={(e) => {
							setApplicantExperiance(e.target.value);
						}}
						placeholder="Experiance"
						type="number"
						className="input input-bordered"
					/>
					<p>Employee 1</p>
					<select
						onChange={(e) => {
							setFirstEmployee(e.target.value);
						}}
						className="select select-bordered w-full max-w-xs"
						value={firstEmployee}
					>
						{employees.map((e, index) => (
							<option key={`employee-${index}`} value={e.emplId}>
								{e.emplName}
							</option>
						))}
					</select>

					<p>Employee 2</p>
					<select
						onChange={(e) => {
							setSecondEmployee(e.target.value);
						}}
						value={secondEmployee}
						className="select select-bordered w-full max-w-xs"
					>
						{employees.map((e, index) => (
							<option key={`employee-${index}`} value={e.emplId}>
								{e.emplName}
							</option>
						))}
					</select>

					<p>Employee 3</p>
					<select
						onChange={(e) => {
							setThirdEmployee(e.target.value);
						}}
						className="select select-bordered w-full max-w-xs"
						value={thirdEmployee}
					>
						{employees.map((e, index) => (
							<option key={`employee-${index}`} value={e.emplId}>
								{e.emplName}
							</option>
						))}
					</select>

					<button onClick={addInterview} className="btn btn-neutral">
						Create
					</button>
				</div>
			</div>
		</div>
	);
}
