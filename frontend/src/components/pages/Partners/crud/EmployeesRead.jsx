import axios from "axios";
import { useEffect, useState } from "react";
import { EmployeesTableRow } from "../table/EmployeesTableRow";
import { getApi } from "../../../../api/apiInstance";

export default function EmployeesRead() {
	const api = getApi();
	
	const [employees, setEmployees] = useState([]);

	const [emplEgn, setEmplEgn] = useState("");
	const [emplName, setEmplName] = useState("");
	const [emplSurname, setEmplSurname] = useState("");
	const [emplLastname, setEmplLastname] = useState("");

	async function getData() {
		const data = await api.get("Employees");
		setEmployees(data.data);
	}
	async function findEmployee() {
		emplEgn && setEmployees(employees.filter(x => x.emplEgn == emplEgn));
		emplName && setEmployees(employees.filter(x => x.emplName == emplName));
		emplSurname && setEmployees(employees.filter(x => x.emplSurname == emplSurname));
		emplLastname && setEmployees(employees.filter(x => x.emplLastname == emplLastname));
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<div className="card bg-base-200">
				<div className="card-body flex flex-row flex-wrap">
					<input
						defaultValue={emplEgn}
						onChange={(e) => {
							setEmplEgn(e.target.value);
						}}
						placeholder="Egn"
						className="input input-bordered"
					/>
					<input
						defaultValue={emplName}
						onChange={(e) => {
							setEmplName(e.target.value);
						}}
						placeholder="First Name"
						className="input input-bordered"
					/>
					<input
						defaultValue={emplSurname}
						onChange={(e) => {
							setEmplSurname(e.target.value);
						}}
						placeholder="Middle Name"
						className="input input-bordered"
					/>
					<input
						defaultValue={emplLastname}
						onChange={(e) => {
							setEmplLastname(e.target.value);
						}}
						placeholder="Last Name"
						className="input input-bordered"
					/>

					<button onClick={findEmployee} className="btn btn-neutral">
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
							<th>Egn</th>
							<th>First Name</th>
							<th>Middle Name</th>
							<th>Last Name</th>
							<td></td>
						</tr>
					</thead>
					<tbody>
						{employees.map((employee, index) => (
							<EmployeesTableRow key={`employee-${index}`} employee={employee} getData={getData} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

