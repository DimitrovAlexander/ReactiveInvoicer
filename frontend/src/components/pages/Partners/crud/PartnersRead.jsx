import { useEffect, useState } from "react";
import axios from "axios"; // Добавяме Axios библиотеката
import { PartnersTableRow } from "../table/PartnersTableRow";

export default function PartnersRead() {
  const api = axios.create({
    baseURL: "https://localhost:7024/api", // Заменете с вашия API URL
    headers: {
      "Content-Type": "application/json",
    },
  });

  const [partners, setPartners] = useState([]);

  // Филтри за търсене
  const [partnerEgn, setEgn] = useState("");
  const [partnerBulstat, setBulstat] = useState("");
  const [clientType, setClientType] = useState("");
  const [partnerFullName, setClientName] = useState("");
  const [partnerEmail, setClientFullName] = useState("");
  const [email, setEmail] = useState("");

  // Зареждане на всички контрагенти
  async function getData() {
    try {
      const response = await api.get("/Partners");
      setPartners(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  }

  // Търсене на контрагенти
  async function findPartners() {
    try {
      const query = {
        ...(partnerEgn && { egn: partnerEgn }),
        ...(partnerBulstat && { bulstat: partnerBulstat }),
        ...(clientType && { clientType }),
        ...(partnerFullName && { clientName: partnerFullName }),
        ...(partnerEmail && { clientFullName: partnerEmail }),
        ...(email && { email }),
      };

      const params = new URLSearchParams(query).toString();
      const response = await api.get(`/Partners?${params}`);
      setPartners(response.data);
    } catch (error) {
      console.error("Error searching partners:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="card bg-base-200">
        <div className="card-body flex flex-row flex-wrap gap-4">
          <input
            value={partnerEgn}
            onChange={(e) => setEgn(e.target.value)}
            placeholder="EGN"
            className="input input-bordered"
          />
          <input
            value={partnerBulstat}
            onChange={(e) => setBulstat(e.target.value)}
            placeholder="BULSTAT"
            className="input input-bordered"
          />
          <select
            value={clientType}
            onChange={(e) => setClientType(e.target.value)}
            className="select select-bordered"
          >
            <option value="">Select Client Type</option>
            <option value="individual">Individual</option>
            <option value="business">Business</option>
          </select>
          <input
            value={partnerFullName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Client Name"
            className="input input-bordered"
          />
          <input
            value={partnerEmail}
            onChange={(e) => setClientFullName(e.target.value)}
            placeholder="Full Name (First, Middle, Last)"
            className="input input-bordered"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input input-bordered"
          />

          <button onClick={findPartners} className="btn btn-neutral">
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
              <th>EGN</th>
              <th>BULSTAT</th>
              <th>Client Type</th>
              <th>Client Name</th>
              <th>Phone number</th>
              <th>Address</th>
              <th>Email</th>
              <th>Edit Partner</th>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner, index) => (
              <PartnersTableRow key={`partner-${index}`} partner={partner} getData={getData} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
