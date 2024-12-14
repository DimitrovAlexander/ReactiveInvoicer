import { useEffect, useState } from "react";
import { getApi } from "../../../../api/apiInstance";
import { InvoicesTableRow } from "../table/InvoicesTableRow";

export default function InvoicesRead() {
  const api = getApi();

  const [invoices, setInvoices] = useState([]);

  // Филтри за търсене
  const [invoiceType, setInvoiceType] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoicePayableUntil, setPayableUntil] = useState("");
  const [invoiceStatus, setInvoiceStatus] = useState("");
  const [invoiceValue, setInvoiceValue] = useState("");
  const [partnerName, setPartnerName] = useState("");

  // Зареждане на всички фактури
  async function getData() {
    try {
      const data = await api.get("Invoices");
      setInvoices(data.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  }

  
  // Търсене на фактури
  async function findInvoices() {
    invoiceType && setInvoices(invoices.filter(x => x.invoiceTypeName == invoiceType));
    invoiceNo && setInvoices(invoices.filter(x => x.invoiceNo == invoiceNo));
    invoiceDate && setInvoices(invoices.filter(x => new Date(x.invoiceDate).toDateString() == new Date(invoiceDate).toDateString()));
    invoicePayableUntil && setInvoices(invoices.filter(x => new Date(x.invoicePayableUntil).toDateString() == new Date(invoicePayableUntil).toDateString()));
    invoiceStatus && setInvoices(invoices.filter(x => x.invoiceStatus == invoiceStatus));
    invoiceValue && setInvoices(invoices.filter(x => x.invoiceValue == invoiceValue));
    partnerName && setInvoices(invoices.filter(x => x.partnerName == partnerName));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="card bg-base-200">
        <div className="card-body flex flex-row flex-wrap gap-4">
           <select
            value={invoiceStatus}
            onChange={(e) => setInvoiceType(e.target.value)}
            className="select select-bordered"
          >
            <option value="">Select Type</option>
            <option value="1">Income</option>
            <option value="2">Expense</option>
          </select>
          <input
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
            placeholder="Invoice No"
            className="input input-bordered"
          />
          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            placeholder="Invoice Date"
            className="input input-bordered"
          />
          <input
            type="date"
            value={invoicePayableUntil}
            onChange={(e) => setPayableUntil(e.target.value)}
            placeholder="Payable Until"
            className="input input-bordered"
          />
          <select
            value={invoiceStatus}
            onChange={(e) => setInvoiceStatus(e.target.value)}
            className="select select-bordered"
          >
            <option value="">Select Status</option>
            <option value="P">Paid</option>
            <option value="U">Unpaid</option>
          </select>
          <input
            type="number"
            value={invoiceValue}
            onChange={(e) => setInvoiceValue(e.target.value)}
            placeholder="Invoice Value"
            className="input input-bordered"
          />
          <input
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            placeholder="Partner Name"
            className="input input-bordered"
          />

          <button onClick={findInvoices} className="btn btn-neutral">
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
              <th>Invoice Info</th>
              <th>Invoice Date</th>
              <th>Payment due</th>
              <th>Payments Info</th>
              <th>Status</th>
              <th>Partner</th>
              <th>Update status</th>
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
  );
}
