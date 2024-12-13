import { useState } from "react";
import { getApi } from "../../../../api/apiInstance";

export default function EmployeesCreate({ refresh }) {
	const api = getApi();

	const [emplEgn, setEmplEgn] = useState("");
	const [emplName, setEmplName] = useState("");
	const [emplSurname, setEmplSurname] = useState("");
	const [emplLastname, setEmplLastname] = useState("");

	const [errorText, setErrorText] = useState();

	async function addEmployee() {
		if (!checkEgn()) {
			alert("Egn must be only numbers!");
			return;
		}

		try {
			await api.post("Employees", {
				emplId: 0,
				emplEgn,
				emplName,
				emplSurname,
				emplLastname,
			});
			refresh();
		} catch (error) {
			alert(error.response.data.message);
		}
	}

	function checkEgn() {
		return !isNaN(emplEgn);
	}

	return (
		<div>
			<div className="card bg-base-200 w-80">
				<div className="card-body">
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

					<button onClick={addEmployee} className="btn btn-neutral">
						Create
					</button>
				</div>
			</div>
		</div>
	);
}
