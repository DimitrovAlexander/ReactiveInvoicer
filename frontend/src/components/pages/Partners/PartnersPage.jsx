import React, { useState, useEffect } from 'react';

import PartnersRead from './crud/PartnersRead.jsx';
import PartnersCreate from './crud/PartnersCreate.jsx';

export default function InterviewsPage() {
	const [refreshCounter, setRefreshCounter] = useState(0);

	function refresh() {
		setRefreshCounter(refreshCounter + 1);
	}

	return (
		<div>
			<PartnersRead key={refreshCounter}/>
			
		</div>
	);
}