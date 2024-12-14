import React, { useState } from 'react';

const PartnersCreate = ({ onCreate }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartner({ ...partner, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(partner);
    setPartner({
      type: '',
      egn: '',
      bulstat: '',
      name: '',
      companyName: '',
      email: '',
      phone: '',
      address: '',
    });
  };

  return (
    <form className="partners-create-form" onSubmit={handleSubmit}>
      <h2>Create New Partner</h2>

      <label>
        Type:
        <select name="type" value={partner.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Individual">Individual</option>
          <option value="Company">Company</option>
        </select>
      </label>

      {partner.type === 'Individual' && (
        <label>
          EGN:
          <input
            type="text"
            name="egn"
            value={partner.egn}
            onChange={handleChange}
            required
            pattern="\d{10}"
            title="EGN must be a 10-digit number"
          />
        </label>
      )}

      {partner.type === 'Company' && (
        <label>
          BULSTAT:
          <input
            type="text"
            name="bulstat"
            value={partner.bulstat}
            onChange={handleChange}
            required
            pattern="\d{9}"
            title="BULSTAT must be a 9-digit number"
          />
        </label>
      )}

      <label>
        {partner.type === 'Individual' ? 'Full Name:' : 'Company Name:'}
        <input
          type="text"
          name={partner.type === 'Individual' ? 'name' : 'companyName'}
          value={partner.type === 'Individual' ? partner.name : partner.companyName}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={partner.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Phone:
        <input
          type="tel"
          name="phone"
          value={partner.phone}
          onChange={handleChange}
        />
      </label>

      <label>
        Address:
        <input
          type="text"
          name="address"
          value={partner.address}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Create Partner</button>
    </form>
  );
};

export default PartnersCreate;
