import React, { useState, useEffect } from 'react';
import { getApi } from "../../../../api/apiInstance";
import { useParams } from 'react-router';

const PartnersEdit = () => {
  const api = getApi();
  const { id } = useParams();
  const [partner, setPartner] = useState({
    type: '',
    egn: '',
    bulstat: '',
    name: '',
    companyName: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const loadPartner = async () => {
      try {
        const response = await api.get(`partners/${id}`);
        const data = response.data;

        setPartner({
            type: data.type,
            egn: data.partnerEgn || '',
            bulstat: data.partnerBulstat || '',
            name: data.name || '',
            companyName: data.companyName || '',
            email: data.partnerEmail || '',
            phone: data.partnerPhone || '',
            address: data.partnerAddress || '',
          });
      } catch (error) {
        alert("Failed to load partner data: " + (error.response?.data?.message || "Unknown error"));
      }
    };

    loadPartner();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartner({ ...partner, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`partners/${id}`, {
        type: partner.type,
        egn: partner.type === 'Individual' ? partner.egn : undefined,
        bulstat: partner.type === 'Company' ? partner.bulstat : undefined,
        name: partner.type === 'Individual' ? partner.name : undefined,
        companyName: partner.type === 'Company' ? partner.companyName : undefined,
        email: partner.email,
        phone: partner.phone,
        address: partner.address,
      });

    } catch (error) {
      alert(error.response?.data?.message || "Error updating partner");
    }
  };

  return (
    <form className="flex flex-col items-center bg-base-200 p-6 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-4">Edit Partner</h2>

      <div className="form-control w-full mb-4">
        <label className="label">
          <span className="label-text">Type:</span>
        </label>
        <select
          name="type"
          value={partner.type}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Type</option>
          <option value="Individual">Individual</option>
          <option value="Company">Company</option>
        </select>
      </div>

      {partner.type === 'Individual' && (
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text">EGN:</span>
          </label>
          <input
            type="text"
            name="egn"
            value={partner.egn}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
            pattern="\d{10}"
            title="EGN must be a 10-digit number"
          />
        </div>
      )}

      {partner.type === 'Company' && (
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text">BULSTAT:</span>
          </label>
          <input
            type="text"
            name="bulstat"
            value={partner.bulstat}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
            pattern="\d{9}"
            title="BULSTAT must be a 9-digit number"
          />
        </div>
      )}

      <div className="form-control w-full mb-4">
        <label className="label">
          <span className="label-text">{partner.type === 'Individual' ? 'Full Name:' : 'Company Name:'}</span>
        </label>
        <input
          type="text"
          name={partner.type === 'Individual' ? 'name' : 'companyName'}
          value={partner.type === 'Individual' ? partner.name : partner.companyName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="form-control w-full mb-4">
        <label className="label">
          <span className="label-text">Email:</span>
        </label>
        <input
          type="email"
          name="email"
          value={partner.email}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="form-control w-full mb-4">
        <label className="label">
          <span className="label-text">Phone:</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={partner.phone}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>

      <div className="form-control w-full mb-4">
        <label className="label">
          <span className="label-text">Address:</span>
        </label>
        <input
          type="text"
          name="address"
          value={partner.address}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>

      <button type="submit" className="btn btn-neutral w-full">
        Update Partner
      </button>
    </form>
  );
};

export default PartnersEdit;
