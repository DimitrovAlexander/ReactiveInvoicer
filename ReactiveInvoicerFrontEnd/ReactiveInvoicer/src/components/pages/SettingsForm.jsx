import React, { useState } from "react";
import "./SettingsForm.css";

const SettingsForm = ({ closeModal }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      aler("Password updated:", password);
    } else {
      alert("Passwords do not match!");
    }
    closeModal();
  };

  return (
    <div className="settings-form">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Password</button>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default SettingsForm;
