import { useState } from "react";
import EmployeesRead from "./crud/EmployeesRead";
import EmployeesCreate from "./crud/EmployeesCreate";

export default function EmployeesPage() {
	const [refreshCounter, setRefreshCounter] = useState(0);

	function refresh() {
		setRefreshCounter(refreshCounter + 1);
	}

	return (
		<div>
			<EmployeesRead key={refreshCounter}/>
			<EmployeesCreate refresh={refresh}/>
		</div>
	);
}
