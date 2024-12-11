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
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Header from "../layout/Header"; // Import the Header component
import LoginForm from '../pages/LoginForm'; // Import the LoginForm component
import SettingsForm from '../pages/SettingsForm'; // Import the SettingsForm component
import Sidebar from '../layout/Sidebar'; // Import Sidebar component

function App() {
  const [contractors, setContractors] = useState([]);
  const [invoices, setInvoices] = useState([]);
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
  const [invoice, setInvoice] = useState({
    type: '', // 'income' or 'expense'
    number: '',
    date: '',
    dueDate: '',
    value: '',
    contractor: '', // Contractor egn or bulstat
    comment: '',
    status: 'Unpaid', // Initial status
    payments: [],
  });

  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [invoiceToEdit, setInvoiceToEdit] = useState(null); // For editing existing invoices

  const [showLoginForm, setShowLoginForm] = useState(false); // State for showing LoginForm
  const [showSettingsForm, setShowSettingsForm] = useState(false); // State for showing SettingsForm

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // State to manage sidebar collapse

  // Handle changes for the invoice form
  const handleChangeInvoice = (event) => {
    const { name, value } = event.target;
    setInvoice({
      ...invoice,
      [name]: value,
    });
  };

  // Submit or update an invoice
  const handleSubmitInvoice = () => {
    if (invoiceToEdit) {
      // If editing, update the invoice
      const updatedInvoices = invoices.map((inv) =>
        inv.number === invoiceToEdit.number ? invoice : inv
      );
      setInvoices(updatedInvoices);
    } else {
      // Add new invoice
      setInvoices([...invoices, invoice]);
    }
    setInvoice({
      type: '',
      number: '',
      date: '',
      dueDate: '',
      value: '',
      contractor: '',
      comment: '',
      status: 'Unpaid',
      payments: [],
    });
    setOpenInvoiceModal(false);
    setInvoiceToEdit(null);
  };

  // Open modal for adding invoice
  const handleOpenInvoiceModal = () => {
    setOpenInvoiceModal(true);
  };

  // Open dialog for changing invoice status
  const handleChangeStatus = (invoiceToChange) => {
    setInvoiceToEdit(invoiceToChange);
    setOpenStatusDialog(true);
  };

  const handleConfirmChangeStatus = (newStatus) => {
    const updatedInvoices = invoices.map((inv) =>
      inv.number === invoiceToEdit.number
        ? { ...inv, status: newStatus }
        : inv
    );
    setInvoices(updatedInvoices);
    setOpenStatusDialog(false);
    setInvoiceToEdit(null);
  };

  // Function to calculate remaining amount and delay
  const calculateRemainingAmount = (invoice) => {
    const totalPayments = invoice.payments.reduce((sum, payment) => sum + payment.amount, 0);
    const remaining = invoice.value - totalPayments;
    const delay = invoice.dueDate && new Date(invoice.dueDate) < new Date() ? Math.floor((new Date() - new Date(invoice.dueDate)) / (1000 * 60 * 60 * 24)) : 0;

    return { remaining, totalPayments, delay };
  };

  const handleLoginClick = () => {
    setShowLoginForm(true); // Show login form when login is clicked
  };

  const handleSettingsClick = () => {
    setShowSettingsForm(true); // Show settings form when settings is clicked
  };

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>
      <Header onLoginClick={handleLoginClick} onSettingsClick={handleSettingsClick} /> {/* Add the header here */}
      
      {/* Show LoginForm if the state is true */}
      {showLoginForm && <LoginForm closeModal={() => setShowLoginForm(false)} />}
      
      {/* Show SettingsForm if the state is true */}
      {showSettingsForm && <SettingsForm closeModal={() => setShowSettingsForm(false)} />}
      
      <div className="app-layout">
        <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} /> {/* Sidebar component */}
        
        <div className="layout-content">
          {/* Main content if neither form is shown */}
          {!showLoginForm && !showSettingsForm && (
            <Box sx={{ padding: 3 }}>
              <Paper elevation={2} sx={{ padding: 2 }}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={10} lg={10}>
                    <Typography variant="h5" gutterBottom>Invoice Management</Typography>
                    
                    {/* Invoice Creation Form */}
                    <Typography variant="h6" sx={{ marginTop: 3 }}>Create New Invoice</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined" margin="normal">
                          <InputLabel>Invoice Type</InputLabel>
                          <Select
                            label="Invoice Type"
                            name="type"
                            value={invoice.type}
                            onChange={handleChangeInvoice}
                          >
                            <MenuItem value="income">Income</MenuItem>
                            <MenuItem value="expense">Expense</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Invoice Number"
                          placeholder="Invoice Number"
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          name="number"
                          value={invoice.number}
                          onChange={handleChangeInvoice}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Date"
                          placeholder="Invoice Date"
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          name="date"
                          value={invoice.date}
                          onChange={handleChangeInvoice}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Due Date"
                          placeholder="Due Date"
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          name="dueDate"
                          value={invoice.dueDate}
                          onChange={handleChangeInvoice}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Value"
                          placeholder="Invoice Value"
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          name="value"
                          value={invoice.value}
                          onChange={handleChangeInvoice}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Contractor EGN"
                          placeholder="Contractor EGN"
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          name="contractor"
                          value={invoice.contractor}
                          onChange={handleChangeInvoice}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Comment"
                          placeholder="Invoice Comment"
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          name="comment"
                          value={invoice.comment}
                          onChange={handleChangeInvoice}
                        />
                      </Grid>
                    </Grid>

                    <Button variant="contained" color="primary" onClick={handleSubmitInvoice} fullWidth>
                      {invoiceToEdit ? 'Update Invoice' : 'Create Invoice'}
                    </Button>
                  </Grid>
                </Grid>
              </Paper>

              {/* Dialog to confirm status change */}
              <Dialog open={openStatusDialog} onClose={() => setOpenStatusDialog(false)}>
                <DialogTitle>Change Invoice Status</DialogTitle>
                <DialogContent>
                  <Typography variant="body1">
                    Are you sure you want to change the status of this invoice?
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleConfirmChangeStatus('Paid')} color="primary">Confirm Paid</Button>
                  <Button onClick={() => setOpenStatusDialog(false)} color="secondary">Cancel</Button>
                </DialogActions>
              </Dialog>
            </Box>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
