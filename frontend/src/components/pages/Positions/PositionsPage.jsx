import { useState } from "react";
import PositionsRead from "./crud/PositionsRead";
import PositionsCreate from "./crud/PositionsCreate";

export default function PositionsPage() {
  const [refreshCounter, setRefreshCounter] = useState(0);

	function refresh() {
		setRefreshCounter(refreshCounter + 1);
	}

	return (
		<div>
			<PositionsRead key={refreshCounter}/>
			<PositionsCreate refresh={refresh}/>
		</div>
	);
}