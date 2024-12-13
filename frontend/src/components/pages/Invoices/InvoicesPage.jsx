import { useState } from "react";
import InvoicesRead from "./crud/InvoicesRead";
import InvoiceCreate from "./crud/InvoiceCreate";

export default function InterviewsPage() {
	const [refreshCounter, setRefreshCounter] = useState(0);

	function refresh() {
		setRefreshCounter(refreshCounter + 1);
	}

	return (
		<div>
			<InvoicesRead key={refreshCounter}/>
			<InvoiceCreate refresh={refresh}/>
		</div>
	);
}
