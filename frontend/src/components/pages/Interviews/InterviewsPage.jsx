import { useState } from "react";
import InterviewsRead from "./crud/InterviewsRead";
import InterviewsCreate from "./crud/InterviewsCreate";

export default function InterviewsPage() {
	const [refreshCounter, setRefreshCounter] = useState(0);

	function refresh() {
		setRefreshCounter(refreshCounter + 1);
	}

	return (
		<div>
			<InterviewsRead key={refreshCounter}/>
			<InterviewsCreate refresh={refresh}/>
		</div>
	);
}
