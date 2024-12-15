import { useEffect, useState } from "react";
import { authCheckLogin, authGetName } from "../../api/auth";

import { getApi } from "../../api/apiInstance";
import { InvoicesTableRow } from "./Invoices/table/InvoicesTableRow";

export default function Home() {
	  const api = getApi();
	  const [invoices, setInvoices] = useState([]);
	
	  async function getData() {
		try {
		  const data = await api.get("Invoices/overdue");
		  setInvoices(data.data);
		} catch (error) {
		  console.error("Error fetching invoices:", error);
		}
	  }
	
	  useEffect(() => {
		getData();
	  }, []);
	  
	return (
		<>
		{ authCheckLogin() ? (
			<div>
			<div>
			<h1>Overdue Invoices: </h1>
			</div>
			<div className="overflow-x-auto">
					<table className="table table-zebra">
					<thead>
					<tr>
					<th>Id</th>
					<th>Invoice Info</th>
					<th>Invoice Date</th>
					<th>Payment due</th>
					<th>Payments Info</th>
						  <th>Status</th>
						  <th>Partner</th>
						  <th>Add Payment</th>
						  <th>Details</th>
						  <th>Edit Invoice</th>
						  <td></td>
						</tr>
					  </thead>
					  <tbody>
						{invoices.map((invoice, index) => (
							<InvoicesTableRow key={`invoice-${index}`} invoice={invoice} getData={getData}/>
						))}
					  </tbody>
					</table>
				  </div>
		</div>
	):(
		<div>

		Welcome to Reactive Invoicer!

		
	</div>
	)}
	</>
)}

