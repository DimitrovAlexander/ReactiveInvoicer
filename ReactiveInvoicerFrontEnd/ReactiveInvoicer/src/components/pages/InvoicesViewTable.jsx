import React, { useState, useCallback, useMemo } from 'react';
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

// Sample data for counteragents and invoices
const initialCounteragents = [
  {
  }
];

const InvoiceTableView = () => {
  const [invoices, setInvoices] = useState([]); // Invoices list
  const [counteragents, setCounteragents] = useState(initialCounteragents);
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedInvoice, setSelectedInvoice] = useState(null); // For editing and viewing invoice details
  const [newInvoiceModalOpen, setNewInvoiceModalOpen] = useState(false); // New invoice modal
  const [newInvoiceData, setNewInvoiceData] = useState({
    type: '',
    number: '',
    date: '',
    dueDate: '',
    amount: '',
    counteragent: null,
    comment: '',
  });
  const [statusChangeModalOpen, setStatusChangeModalOpen] = useState(false); // Status change confirmation modal
  const [paymentDetails, setPaymentDetails] = useState({ payments: [], totalPaid: 0, remaining: 0, overdueDays: 0 }); // Mock payment details for the invoice

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
      updatedData.splice(row.index, 1); // Remove invoice from list
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
    {
      accessorKey: 'number',
      header: 'Invoice Number',
    },
    {
      accessorKey: 'type',
      header: 'Type',
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
    {
      accessorKey: 'dueDate',
      header: 'Due Date',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      Cell: ({ cell }) => `$${cell.getValue()}`,
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'counteragent',
      header: 'Counteragent',
      Cell: ({ cell }) => cell.getValue().name,
    },
  ], []);

  const handleRowClick = (row) => {
    setSelectedInvoice(row.original);
  };

  return (
    <>
      <Header onLoginClick={() => console.log('Login clicked')} onSettingsClick={() => console.log('Settings clicked')} /> {/* Add Header here */}
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
              <Select
                name="type"
                value={newInvoiceData.type}
                onChange={handleNewInvoiceChange}
              >
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Expense">Expense</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Invoice Number"
              name="number"
              value={newInvoiceData.number}
              onChange={handleNewInvoiceChange}
            />
            <TextField
              label="Invoice Date"
              type="date"
              name="date"
              value={newInvoiceData.date}
              onChange={handleNewInvoiceChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Due Date"
              type="date"
              name="dueDate"
              value={newInvoiceData.dueDate}
              onChange={handleNewInvoiceChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Invoice Amount"
              type="number"
              name="amount"
              value={newInvoiceData.amount}
              onChange={handleNewInvoiceChange}
            />
            <FormControl fullWidth>
              <InputLabel>Counteragent</InputLabel>
              <Select
                name="counteragent"
                value={newInvoiceData.counteragent?.id || ''}
                onChange={handleNewInvoiceChange}
              >
                {counteragents.map((counteragent) => (
                  <MenuItem key={counteragent.id} value={counteragent.id}>
                    {counteragent.name}
                  </MenuItem>
                ))}
                <MenuItem value="new">Add New Counteragent</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Invoice Comment"
              name="comment"
              value={newInvoiceData.comment}
              onChange={handleNewInvoiceChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewInvoiceModalOpen(false)}>Cancel</Button>
          <Button onClick={handleNewInvoiceSubmit} color="primary">
            Save Invoice
          </Button>
        </DialogActions>
      </Dialog>

      {/* Status Change Confirmation Modal */}
      {selectedInvoice && (
        <Dialog open={statusChangeModalOpen} onClose={() => setStatusChangeModalOpen(false)}>
          <DialogTitle>Change Invoice Status</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Total Paid: ${paymentDetails.totalPaid}
            </Typography>
            <Typography variant="body1">
              Remaining: ${paymentDetails.remaining}
            </Typography>
            <Typography variant="body1">
              Overdue by: {paymentDetails.overdueDays} days
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setStatusChangeModalOpen(false)}>Cancel</Button>
            <Button onClick={handleStatusChange} color="primary">
              Confirm Status Change
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default InvoiceTableView;
