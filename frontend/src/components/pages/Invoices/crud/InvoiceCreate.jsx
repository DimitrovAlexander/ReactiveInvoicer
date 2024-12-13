import { useEffect, useState } from "react";
import { getApi } from "../../../../api/apiInstance";

export default function InvoiceCreate({ refresh }) {
  const api = getApi();

  const [partners, setPartners] = useState([]);
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [isNewPartner, setIsNewPartner] = useState(false);

  const [invoiceType, setInvoiceType] = useState("income");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().substring(0, 10));
  const [invoicePayableUntil, setInvoicePayableUntil] = useState(new Date().toISOString().substring(0, 10));
  const [invoiceValue, setInvoiceValue] = useState("");
  const [invoiceNote, setInvoiceNote] = useState("");

  const [partnerEgn, setPartnerEgn] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [partnerSurname, setPartnerSurname] = useState("");
  const [partnerLastname, setPartnerLastname] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerPhone, setPartnerPhone] = useState("");
  const [partnerAddress, setPartnerAddress] = useState("");

  async function createInvoice() {
    if (parseFloat(invoiceValue) <= 0) {
      alert("Invoice value must be greater than 0!");
      return;
    }

    try {
      await api.post("Invoices", {
        partnerId: isNewPartner ? null : selectedPartnerId,
        partnerEgn: isNewPartner ? partnerEgn : null,
        partnerName: isNewPartner ? partnerName : null,
        partnerSurname: isNewPartner ? partnerSurname : null,
        partnerLastname: isNewPartner ? partnerLastname : null,
        partnerEmail: isNewPartner ? partnerEmail : null,
        partnerPhone: isNewPartner ? partnerPhone : null,
        partnerAddress: isNewPartner ? partnerAddress : null,
        invoiceTypeId: invoiceType === "income" ? 1 : 2,
        invoiceNo,
        invoiceDate,
        payableUntil: invoicePayableUntil,
        invoiceValue,
        invoiceNote
      });
      refresh();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating invoice");
    }
  }

  async function loadPartners() {
    try {
      const data = await api.get("Partners");
      setPartners(data.data);
	  console.log(data.data)
    } catch (error) {
      console.error("Failed to load partners", error);
    }
  }

  useEffect(() => {
    loadPartners();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="card bg-base-200 w-96">
        <div className="card-body">
          <h2 className="text-lg font-bold">Create New Invoice</h2>
          <select
            value={invoiceType}
            onChange={(e) => setInvoiceType(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="text"
            placeholder="Invoice Number"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
            className="input input-bordered w-full"
          />

          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            className="input input-bordered w-full"
          />

          <input
            type="date"
            value={invoicePayableUntil}
            onChange={(e) => setInvoicePayableUntil(e.target.value)}
            className="input input-bordered w-full"
          />

          <input
            type="number"
            placeholder="Invoice Value"
            value={invoiceValue}
            onChange={(e) => setInvoiceValue(e.target.value)}
            className="input input-bordered w-full"
          />

          <textarea
            placeholder="Invoice Note"
            value={invoiceNote}
            onChange={(e) => setInvoiceNote(e.target.value)}
            className="textarea textarea-bordered w-full"
          ></textarea>

          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Register New Partner?</span>
              <input
                type="checkbox"
                checked={isNewPartner}
                onChange={(e) => setIsNewPartner(e.target.checked)}
                className="checkbox"
              />
            </label>
          </div>

          {!isNewPartner ? (
            <select
              value={selectedPartnerId}
              onChange={(e) => setSelectedPartnerId(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Select Existing Partner</option>
              {partners.map((p) => (
                <option key={p.partnerId} value={p.partnerId}>
                  {p.partnertFullname}
                </option>
              ))}
            </select>
          ) : (
            <div>
              <input
                type="text"
                placeholder="EGN"
                value={partnerEgn}
                onChange={(e) => setPartnerEgn(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="First Name"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Surname"
                value={partnerSurname}
                onChange={(e) => setPartnerSurname(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={partnerLastname}
                onChange={(e) => setPartnerLastname(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="email"
                placeholder="Email"
                value={partnerEmail}
                onChange={(e) => setPartnerEmail(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Phone"
                value={partnerPhone}
                onChange={(e) => setPartnerPhone(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Address"
                value={partnerAddress}
                onChange={(e) => setPartnerAddress(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
          )}

          <button onClick={createInvoice} className="btn btn-neutral w-full mt-4">
            Create Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
