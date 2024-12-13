import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getApi } from "../../../api/apiInstance";
import { InterviewsTableRow } from "../Interviews/table/InterviewsTableRow";

export default function EmployeesOnePage() {
	const api = getApi();

	const { id } = useParams();

	const [employee, setEmployee] = useState({});
	const [interviews, setInterviews] = useState([]);
	const [egn, setEgn] = useState("");
	const [fname, setFName] = useState("");
	const [sname, setSName] = useState("");
	const [lname, setLName] = useState("");

	async function getInterviews() {
		const data = await api.get(`employees/${id}/interviews`);
		setInterviews(data.data)
	}
	async function getData() {
		const data = await api.get(`employees/${id}`);
		setEmployee(data.data);
		setEgn(data.data.emplEgn);
		setFName(data.data.emplName);
		setSName(data.data.emplSurname);
		setLName(data.data.emplLastname);
	}

	async function editEmployee() {
		const eEmployee = employee;
		eEmployee.emplEgn = egn;
		eEmployee.emplName = fname;
		eEmployee.emplSurname = sname;
		eEmployee.emplLastname = lname;
		await api.put(`employees/${id}`, eEmployee);
		await getData()
	}

	useEffect(() => {
		getData();
		getInterviews()
	}, []);


	return <div>
			<div>Id: {id}</div>
			<div>Egn: {employee.emplEgn}</div>
			<div>First Name: {employee.emplName}</div>
			<div>Middle Name: {employee.emplSurname}</div>
			<div>Last Name: {employee.emplLastname}</div>

			<div className="flex flex-row">
				<div className="card bg-base-200 w-80">
					<div className="card-body">
						<input
							defaultValue={egn}
							onChange={(e) => {
								setEgn(e.target.value);
							}}
							className="input input-bordered"
						/>
						<input
							defaultValue={fname}
							onChange={(e) => {
								setFName(e.target.value);
							}}
							className="input input-bordered"
						/>
						<input
							defaultValue={sname}
							onChange={(e) => {
								setSName(e.target.value);
							}}
							className="input input-bordered"
						/>
						<input
							defaultValue={lname}
							onChange={(e) => {
								setLName(e.target.value);
							}}
							className="input input-bordered"
						/>
						
						<button onClick={editEmployee} className="btn btn-neutral">
							Edit
						</button>
					</div>
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
						{Array.isArray(interviews) && interviews?.map((interview, index) => (
							<InterviewsTableRow key={`interview-${index}`} interview={interview} getData={getData} />
						))}
					</tbody>
				</table>
			</div>
		</div>;
}
