import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getApi } from "../../../api/apiInstance";

export default function PartnersOnePage() {
  const api = getApi();
  const { id } = useParams();

  const [partner, setPartner] = useState(null); // По подразбиране `null`

  // Зареждане на данните за контрагента
  async function getData() {
    try {
      const response = await api.get(`partners/${id}`);
      setPartner(response.data);
    } catch (error) {
      console.error("Error fetching partner data:", error);
    }
  }

  // Изтриване на контрагент
  async function deletePartner() {
    const confirmed = window.confirm(
      `Are you sure you want to delete this partner: ${partner.clientName || partner.clientFullName}?`
    );
    if (!confirmed) return;

    try {
      await api.delete(`/partners/${id}`);
      alert("Partner deleted successfully!");
      window.history.back(); // Връщане назад след изтриване
    } catch (error) {
      alert(`Error deleting partner: ${error.response?.data || error.message}`);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (!partner) {
    return <div>Loading...</div>; // Показва се, докато данните се зареждат
  }

  return (
    <div>
      <h1 className="text-xl font-bold">Partner Details</h1>
      <div className="card bg-base-200 p-4">
        <div>
          <strong>Partner ID:</strong> {partner.partnerId || "N/A"}
        </div>
        <div>
          <strong>EGN:</strong> {partner.egn || "N/A"}
        </div>
        <div>
          <strong>BULSTAT:</strong> {partner.bulstat || "N/A"}
        </div>
        <div>
          <strong>Client Type:</strong> {partner.clientType === "individual" ? "Individual" : "Business"}
        </div>
        <div>
          <strong>Client Name:</strong> {partner.clientName || "N/A"}
        </div>
        <div>
          <strong>Full Name:</strong> {partner.clientFullName || "N/A"}
        </div>
        <div>
          <strong>Email:</strong> {partner.email || "N/A"}
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => deletePartner()}
          className="btn btn-error mr-4"
        >
          Delete Partner
        </button>
        <button
          onClick={() => window.history.back()}
          className="btn btn-neutral"
        >
          Back
        </button>
      </div>
    </div>
  );
}
