import { useState } from "react";
import { getApi } from "../../../../api/apiInstance";
import { useNavigate } from "react-router";

export function EmployeesTableRow({ employee, getData }) {
	const api = getApi();
	const navigate = useNavigate();

	return (
		<tr>
			<th>{employee.emplId}</th>
			<td>{employee.emplEgn}</td>
			<td>{employee.emplName}</td>
			<td>{employee.emplSurname}</td>
			<td>{employee.emplLastname}</td>
			<td>
				<button
					className={`btn`}
					onClick={() => {
						navigate(`/employees/${employee.emplId}`);
					}}
				>
					View
				</button>
			</td>
		</tr>
	);
}
