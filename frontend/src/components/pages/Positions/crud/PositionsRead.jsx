import { useEffect, useState } from 'react'
import PositionsTableRow from '../table/PositionsTableRow';
import { getApi } from '../../../../api/apiInstance';

export default function PositionsRead() {
	const api = getApi()

    const [positions, setPositions] = useState([]);

	async function getData() {
		const data = await api.get("Positions");
		setPositions(data.data);
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<div className="overflow-x-auto">
				<table className="table table-zebra">
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Summary</th>
							<td></td>
						</tr>
					</thead>
					<tbody>
						{positions.map((position, index) => (
							<PositionsTableRow key={`position-${index}`} position={position} getData={getData} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
