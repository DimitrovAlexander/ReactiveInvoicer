import React, { useState, useCallback, useMemo, useEffect } from 'react';
import axios from "axios"
import { MaterialReactTable } from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Header from "../layout/Header"; // Import the Header component
import LoginForm from '../pages/LoginForm'; // Import the LoginForm component
import SettingsForm from '../pages/SettingsForm'; // Import the SettingsForm component
import Sidebar from '../layout/Sidebar'; // Import Sidebar component

const initialCounteragents = [
  { id: 1, name: 'Counteragent A' },
  { id: 2, name: 'Counteragent B' },
];

const InvoiceTableView = () => {
  const [invoices, setInvoices] = useState([]);
  const [counteragents, setCounteragents] = useState(initialCounteragents);
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [newInvoiceModalOpen, setNewInvoiceModalOpen] = useState(false);
  const [newInvoiceData, setNewInvoiceData] = useState({
    type: '',
    number: '',
    date: '',
    dueDate: '',
    amount: '',
    counteragent: null,
    comment: '',
  });
  const [statusChangeModalOpen, setStatusChangeModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({ payments: [], totalPaid: 0, remaining: 0, overdueDays: 0 });

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSettingsForm, setShowSettingsForm] = useState(false);

  // Sidebar state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);


  async function getData() {
    const data = await axios.get("https://localhost:7024/api/Invoices")
    setInvoices(data.data)
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      const updatedData = [...invoices];
      updatedData[row.index] = values;
      setInvoices(updatedData);
      exitEditingMode();
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteInvoice = useCallback(
    (row) => {
      if (!window.confirm(`Are you sure you want to delete invoice #${row.getValue('number')}`)) {
        return;
      }
      const updatedData = [...invoices];
      updatedData.splice(row.index, 1);
      setInvoices(updatedData);
    },
    [invoices],
  );

  const handleNewInvoiceChange = (e) => {
    const { name, value } = e.target;
    setNewInvoiceData({
      ...newInvoiceData,
      [name]: value,
    });
  };

  const handleNewInvoiceSubmit = () => {
    if (!newInvoiceData.number || !newInvoiceData.amount || !newInvoiceData.dueDate || !newInvoiceData.type || !newInvoiceData.counteragent) {
      alert('Please fill in all required fields.');
      return;
    }
    if (newInvoiceData.amount <= 0) {
      alert('Invoice amount must be greater than zero.');
      return;
    }

    const newInvoice = {
      ...newInvoiceData,
      status: 'Unpaid',
      payments: [],
    };

    setInvoices([...invoices, newInvoice]);
    setNewInvoiceModalOpen(false);
    setNewInvoiceData({
      type: '',
      number: '',
      date: '',
      dueDate: '',
      amount: '',
      counteragent: null,
      comment: '',
    });
  };

  const handleStatusChange = () => {
    const updatedInvoice = { ...selectedInvoice, status: 'Paid' };
    setInvoices(invoices.map((inv) => (inv.number === selectedInvoice.number ? updatedInvoice : inv)));
    setStatusChangeModalOpen(false);
  };

  const columns = useMemo(() => [
    { accessorKey: 'invocieNo', header: 'Invoice Number' },
    { accessorKey: 'invoiceTypeName', header: 'Type' },
    { accessorKey: 'invocieDate', header: 'Date' },
    { accessorKey: 'invoicePayableUntil', header: 'Due Date' },
    { accessorKey: 'invoiceValue', header: 'Amount'},
    { accessorKey: 'invoiceStatus', header: 'Status' },
    { accessorKey: 'partnerName', header: 'Counteragent'},
  ], []);

  const handleRowClick = (row) => {
    setSelectedInvoice(row.original);
  };

  const handleLoginClick = () => setShowLoginForm(true);
  const handleSettingsClick = () => setShowSettingsForm(true);

  // Toggle sidebar collapse
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <>
      <Header onLoginClick={handleLoginClick} onSettingsClick={handleSettingsClick} /> {/* Add Header here */}

      {showLoginForm && <LoginForm closeModal={() => setShowLoginForm(false)} />}
      {showSettingsForm && <SettingsForm closeModal={() => setShowSettingsForm(false)} />}

      <div className="app-layout">
        <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} /> {/* Sidebar component */}
        
        <div className="layout-content">
          {/* Invoice List Table */}
          <MaterialReactTable
            columns={columns}
            data={invoices}
            onRowClick={handleRowClick}
            enableColumnOrdering
            enableEditing
            onEditingRowSave={handleSaveRowEdits}
            onEditingRowCancel={handleCancelRowEdits}
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton onClick={() => table.setEditingRow(row)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton color="error" onClick={() => handleDeleteInvoice(row)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          />

          {/* New Invoice Modal */}
          <Dialog open={newInvoiceModalOpen} onClose={() => setNewInvoiceModalOpen(false)}>
            <DialogTitle>Register New Invoice</DialogTitle>
            <DialogContent>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Invoice Type</InputLabel>
                  <Select name="type" value={newInvoiceData.type} onChange={handleNewInvoiceChange}>
                    <MenuItem value="Income">Income</MenuItem>
                    <MenuItem value="Expense">Expense</MenuItem>
                  </Select>
                </FormControl>
                <TextField label="Invoice Number" name="number" value={newInvoiceData.number} onChange={handleNewInvoiceChange} />
                <TextField label="Invoice Date" type="date" name="date" value={newInvoiceData.date} onChange={handleNewInvoiceChange} InputLabelProps={{ shrink: true }} />
                <TextField label="Due Date" type="date" name="dueDate" value={newInvoiceData.dueDate} onChange={handleNewInvoiceChange} InputLabelProps={{ shrink: true }} />
                <TextField label="Invoice Amount" type="number" name="amount" value={newInvoiceData.amount} onChange={handleNewInvoiceChange} />
                <FormControl fullWidth>
                  <InputLabel>Counteragent</InputLabel>
                  <Select name="counteragent" value={newInvoiceData.counteragent?.id || ''} onChange={handleNewInvoiceChange}>
                    {counteragents.map((counteragent) => (
                      <MenuItem key={counteragent.id} value={counteragent.id}>{counteragent.name}</MenuItem>
                    ))}
                    <MenuItem value="new">Add New Counteragent</MenuItem>
                  </Select>
                </FormControl>
                <TextField label="Invoice Comment" name="comment" value={newInvoiceData.comment} onChange={handleNewInvoiceChange} />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setNewInvoiceModalOpen(false)}>Cancel</Button>
              <Button onClick={handleNewInvoiceSubmit} color="primary">Save Invoice</Button>
            </DialogActions>
          </Dialog>

          {/* Status Change Confirmation Modal */}
          {selectedInvoice && (
            <Dialog open={statusChangeModalOpen} onClose={() => setStatusChangeModalOpen(false)}>
              <DialogTitle>Change Invoice Status</DialogTitle>
              <DialogContent>
                <Typography variant="body1">Total Paid: ${paymentDetails.totalPaid}</Typography>
                <Typography variant="body1">Remaining: ${paymentDetails.remaining}</Typography>
                <Typography variant="body1">Overdue by: {paymentDetails.overdueDays} days</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setStatusChangeModalOpen(false)}>Cancel</Button>
                <Button onClick={handleStatusChange} color="primary">Confirm Status Change</Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
      </div>
    </>
  );
};

export default InvoiceTableView;
