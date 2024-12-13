import { useState } from "react";
import { getApi } from "../../../../api/apiInstance";
import { useNavigate } from "react-router";

export function InvoicesTableRow({ invoice, getData }) {
  const api = getApi();
  const navigate = useNavigate();

  // Function to calculate overdue days
  function calculateOverdueDays(payableDate) {
    if (!payableDate) return 0; // Check if the payable date exists
    const today = new Date(); // Current date
    const dueDate = new Date(payableDate); // Payable until date

    if (today > dueDate) {
      // Convert dates to milliseconds and calculate difference in days
      const differenceInTime = today.getTime() - dueDate.getTime();
      return Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // Difference in days
    }

    return 0; // No overdue
  }

  // Function to change the invoice status
  async function changeStatus(newStatus) {
    const confirmed = window.confirm(
      `Are you sure you want to change the status of invoice #${invoice.invoiceNo} to ${newStatus}?`
    );

    if (!confirmed) return;

    try {
      await api.put(`/Invoices/${invoice.invoiceId}/status`, { status: newStatus });
      alert(`Invoice status updated to ${newStatus}`);
      getData(); // Refresh the invoice list
    } catch (error) {
      alert(`Error updating status: ${error.response?.data?.message || error.message}`);
    }
  }

  // Check if `payments` is an array and calculate values
  const totalPayments = Array.isArray(invoice.payments)
    ? invoice.payments.reduce((sum, payment) => sum + payment.paymentValue, 0)
    : 0;

  const remainingBalance = invoice.invoiceValue - totalPayments;
  const overdueDays = calculateOverdueDays(invoice.invoicePayableUntil);

  return (
    <tr>
      <th>{invoice.invoiceId}</th>
      <td>
        <div>Invoice No: {invoice.invoiceNo}</div>
        <div>Type: {invoice.invoiceTypeName}</div>
      </td>
      <td>{invoice.invoiceDate}</td>
      <td>{invoice.invoicePayableUntil}</td>
      <td>
        <div>Total Payments: {totalPayments.toFixed(2)}</div>
        <div>Remaining Balance: {remainingBalance.toFixed(2)}</div>
        <div>
          Overdue Days:{" "}
          <span className={`${overdueDays > 0 ? "text-red-500" : "text-green-500"}`}>
            {overdueDays}
          </span>
        </div>
      </td>
      <td>{invoice.invoiceStatus === "P" ? "Paid" : "Unpaid"}</td>
      <td>{invoice.partnerName}</td> 
      <td>
        <button
          className="btn btn-neutral mr-2"
          onClick={() => changeStatus(invoice.invoiceStatus === "P" ? "U" : "P")}
        >
          {invoice.invoiceStatus === "P" ? "Mark as Unpaid" : "Mark as Paid"}
        </button>
      </td>
      <td>
        <button
          className="btn btn-neutral mr-2"
          onClick={() => {
            if (invoice.payments.length > 0) {
              alert("Cannot edit an invoice with payments.");
              return;
            }
            navigate(`/invoices/edit/${invoice.invoiceId}`);
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}

    
