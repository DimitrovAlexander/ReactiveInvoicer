import React, { useState } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import Header from '../layout/Header';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SettingsForm from './SettingsForm';
import Sidebar from '../layout/Sidebar';



const CreateContractor = () => {
  const navigate = useNavigate();

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSettingsForm, setShowSettingsForm] = useState(false);
  const [selectedIdType, setSelectedIdType] = useState('EGN'); // State for selecting ID type
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

  // Handlers
  const handleLoginClick = () => setShowLoginForm(true);
  const handleSettingsClick = () => setShowSettingsForm(true);

  const handleChangeContractor = (event) => {
    const { name, value } = event.target;
    setContractor({
      ...contractor,
      [name]: value,
    });
  };

  const handleIdTypeChange = (event) => setSelectedIdType(event.target.value);

  const handleSubmit = () => {
    console.log('Contractor Data:', contractor);
  };

  const handleRedirect = () => {
    navigate('/create-invoice');
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="layout-content">
        <Header onLoginClick={handleLoginClick} onSettingsClick={handleSettingsClick} />
        
        {showLoginForm && <LoginForm closeModal={() => setShowLoginForm(false)} />}
        {showSettingsForm && <SettingsForm closeModal={() => setShowSettingsForm(false)} />}
        
        {!showLoginForm && !showSettingsForm && (
          <Box sx={{ padding: 3 }}>
            <Paper elevation={2} sx={{ padding: 2 }}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={10} lg={10}>
                  <Typography variant="h5" gutterBottom>Contractor Registry</Typography>

                  {/* ID Type Selection */}
                  <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
                    <FormLabel component="legend">Select ID Type</FormLabel>
                    <RadioGroup
                      row
                      value={selectedIdType}
                      onChange={handleIdTypeChange}
                    >
                      <FormControlLabel value="EGN" control={<Radio />} label="EGN" />
                      <FormControlLabel value="BULSTAT" control={<Radio />} label="BULSTAT" />
                    </RadioGroup>
                  </FormControl>

                  {/* Contractor Form */}
                  <Grid container spacing={2}>
                    {selectedIdType === 'EGN' && (
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
                        />
                      </Grid>
                    )}
                    {selectedIdType === 'BULSTAT' && (
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
                        />
                      </Grid>
                    )}

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

                  <Typography variant="h6" sx={{ marginTop: 3 }}>Invoices</Typography>
                  <Button variant="contained" color="secondary" fullWidth onClick={handleRedirect}>
                    Register New Invoice
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        )}
      </div>
    </div>
  );
};

export default CreateContractor;
