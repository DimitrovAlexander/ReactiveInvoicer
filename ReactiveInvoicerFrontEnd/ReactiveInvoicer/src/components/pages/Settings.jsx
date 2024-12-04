// SettingsPage.js
import React, { useState } from 'react';

const Settings = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // Call API to change password
    console.log('Password changed:', newPassword);
  };

  const handleAccountDeletion = (e) => {
    e.preventDefault();
    if (deleteConfirmation !== 'DELETE') {
      alert('You must type DELETE to confirm account deletion.');
      return;
    }
    // Call API to delete account
    console.log('Account deleted');
  };

  return (
    <div>
      <h2>Settings</h2>

      <form onSubmit={handlePasswordChange}>
        <h3>Change Password</h3>
        <label>
          Current Password:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </label>
        <br />
        <label>
          New Password:
          <input 
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
          />
        </label>
        <br />
        <label>
          Confirm New Password:
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </label>
        <br />
        <button type="submit">Change Password</button>
      </form>

      <form onSubmit={handleAccountDeletion}>
        <h3>Delete Account</h3>
        <label>
          Type "DELETE" to confirm account deletion:
          <input 
            type="text" 
            value={deleteConfirmation} 
            onChange={(e) => setDeleteConfirmation(e.target.value)} 
          />
        </label>
        <br />
        <button type="submit" style={{ backgroundColor: 'red', color: 'white' }}>
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default Settings;
