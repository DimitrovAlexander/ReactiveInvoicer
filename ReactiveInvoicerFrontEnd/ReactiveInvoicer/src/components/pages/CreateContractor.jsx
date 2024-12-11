import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Grid, Paper, Box, Typography } from '@mui/material';
import Header from '../layout/Header'; // Import Header
import { useNavigate } from 'react-router-dom';

const CreateContractor = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    console.log("Login clicked");
    // Your login logic here
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
    // Your settings logic here
  };

  // State to handle the contractor form
  const [contractor, setContractor] = useState({
    egn: '',
    bulstat: '',
    clientType: '',
    firstName: '',
    middleName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: '',
    address: '',
  });

  // Handler for input changes
  const handleChangeContractor = (event) => {
    const { name, value } = event.target;
    setContractor({
      ...contractor,
      [name]: value,
    });
  };

  // Handler for form submission
  const handleSubmit = () => {
    console.log('Contractor Data:', contractor);
    // Simulate saving the contractor's data (e.g., sending to an API)
  };

  return (
    <div>
      <Header onLoginClick={handleLoginClick} onSettingsClick={handleSettingsClick} /> {/* Use the Header */}
      
      <Box sx={{ padding: 3 }}>
        <Paper elevation={2} sx={{ padding: 2 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={10} lg={10}>
              <Typography variant="h5" gutterBottom>Contractor Registry</Typography>

              {/* Contractor Information Form */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="EGN"
                    placeholder="EGN"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="egn"
                    value={contractor.egn}
                    onChange={handleChangeContractor}
                    disabled={contractor.clientType === 'Legal'} // EGN should be visible only for physical persons
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="BULSTAT"
                    placeholder="BULSTAT"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="bulstat"
                    value={contractor.bulstat}
                    onChange={handleChangeContractor}
                    disabled={contractor.clientType === 'Physical'} // BULSTAT should be visible only for legal persons
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>Client Type</InputLabel>
                    <Select
                      label="Client Type"
                      name="clientType"
                      value={contractor.clientType}
                      onChange={handleChangeContractor}
                    >
                      <MenuItem value="Physical">Physical</MenuItem>
                      <MenuItem value="Legal">Legal</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {contractor.clientType === 'Physical' ? (
                  <>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="First Name"
                        placeholder="First Name"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        name="firstName"
                        value={contractor.firstName}
                        onChange={handleChangeContractor}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Middle Name"
                        placeholder="Middle Name"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        name="middleName"
                        value={contractor.middleName}
                        onChange={handleChangeContractor}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Last Name"
                        placeholder="Last Name"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        name="lastName"
                        value={contractor.lastName}
                        onChange={handleChangeContractor}
                      />
                    </Grid>
                  </>
                ) : (
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Company Name"
                      placeholder="Company Name"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      name="companyName"
                      value={contractor.companyName}
                      onChange={handleChangeContractor}
                    />
                  </Grid>
                )}

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email"
                    placeholder="Email"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="email"
                    value={contractor.email}
                    onChange={handleChangeContractor}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Phone"
                    placeholder="Phone"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="phone"
                    value={contractor.phone}
                    onChange={handleChangeContractor}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Address"
                    placeholder="Address"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="address"
                    value={contractor.address}
                    onChange={handleChangeContractor}
                  />
                </Grid>
              </Grid>

              <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                Save Contractor
              </Button>

              {/* Invoice Section (RQ-3 & RQ-4) */}
              <Typography variant="h6" sx={{ marginTop: 3 }}>Invoices</Typography>
              <Button variant="contained" color="secondary" fullWidth>
                Register New Invoice
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};

export default CreateContractor;
