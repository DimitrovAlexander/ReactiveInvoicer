import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getApi } from "../../../api/apiInstance";

export default function InvoiceOnePage() {
  const api = getApi();
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null); // По подразбиране `null`
  const [totalPayments, setTotalPayments] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [overdueDays, setOverdueDays] = useState(0);
  const [status, setStatus] = useState("");

  // Зареждане на данните за фактурата
  async function getData() {
    try {
      const response = await api.get(`Invoices/${id}`);
      const data = response.data;

      setInvoice(data);

      // Изчисляване на плащания, баланс и закъснение
      const totalPayments = data.payments?.reduce((sum, payment) => sum + payment.paymentValue, 0) || 0;
      const remainingBalance = (data.invoiceValue || 0) - totalPayments;
      const overdueDays = calculateOverdueDays(data.invoicePayableUntil);

      setTotalPayments(totalPayments);
      setRemainingBalance(remainingBalance);
      setOverdueDays(overdueDays);
      setStatus(data.invoiceStatus || ""); // Уверяваме се, че статусът е достъпен
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    }
  }

  // Промяна на статус на фактура
  async function changeStatus(newStatus) {
    const confirmed = window.confirm(`Are you sure you want to change the status of this invoice to ${newStatus}?`);
    if (!confirmed) return;

    try {
      await api.put(`invoices/${id}/updateStatus`, {

         status: newStatus
        
        });
      alert("Invoice status updated successfully!");
      navigate(-1);
      getData(); // Обновяване на данните след промяна
    } catch (error) {
      alert(`Error updating invoice status: ${error.response?.data?.message || error.message}`);
    }
  }

  // Изчисляване на закъснели дни
  function calculateOverdueDays(payableDate) {
    if (!payableDate) return 0; // Ако няма дата "платима до", няма закъснение

    const today = new Date();
    const dueDate = new Date(payableDate);

    if (today > dueDate) {
      const differenceInTime = today.getTime() - dueDate.getTime();
      return Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // Разлика в дни
    }

    return 0; // Няма закъснение
  }

  useEffect(() => {
    getData();
  }, []);

  if (!invoice) {
    return <div>Loading...</div>; // Показва се, докато данните се зареждат
  }

  return (
    <div>
      <h1 className="text-xl font-bold">Invoice Details</h1>
      <div className="card bg-base-200 p-4">
        <div>
          <strong>Invoice No:</strong> {invoice.invoiceNo || "N/A"}
        </div>
        <div>
          <strong>Invoice Type:</strong> {invoice.invoiceTypeName || "N/A"}
        </div>
        <div>
          <strong>Invoice Date:</strong> {invoice.invoiceDate || "N/A"}
        </div>
        <div>
          <strong>Payable Until:</strong> {invoice.invoicePayableUntil || "N/A"}
        </div>
        <div>
          <strong>Total Value:</strong> {invoice.invoiceValue ? invoice.invoiceValue.toFixed(2) : "0.00"}
        </div>
        <div>
          <strong>Total Payments:</strong> {totalPayments.toFixed(2)}
        </div>
        <div>
          <strong>Remaining Balance:</strong> {remainingBalance.toFixed(2)}
        </div>
        <div>
          <strong>Overdue Days:</strong>{" "}
          <span className={overdueDays > 0 ? "text-red-500" : "text-green-500"}>{overdueDays}</span>
        </div>
        <div>
          <strong>Status:</strong> {status === "P" ? "Paid" : "Unpaid"}
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => changeStatus(status === "P" ? "U" : "P")}
          className="btn btn-neutral"
        >
          {status === "P" ? "Mark as Unpaid" : "Mark as Paid"}
        </button>
      </div>
    </div>
  );
}
