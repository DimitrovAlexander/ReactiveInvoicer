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
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Header from "../layout/Header"; // Import the Header component
import LoginForm from './LoginForm'; // Import the LoginForm component
import SettingsForm from './SettingsForm'; // Import the SettingsForm component
import Sidebar from '../layout/Sidebar'; // Import Sidebar component

const ContractorViewTable = () => {
  const [tableData, setTableData] = useState([]); // Start with an empty array
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedCounteragent, setSelectedCounteragent] = useState(null); // Track selected counteragent for details
  const [newInvoiceModalOpen, setNewInvoiceModalOpen] = useState(false); // Track if the invoice modal is open
  const [newInvoiceData, setNewInvoiceData] = useState({ id: '', amount: '', date: '' });
  const [showLoginForm, setShowLoginForm] = useState(false); // State for showing LoginForm
  const [showSettingsForm, setShowSettingsForm] = useState(false); // State for showing SettingsForm

  const handleLoginClick = () => {
    setShowLoginForm(true); // Show login form when login is clicked
  };

  const handleSettingsClick = () => {
    setShowSettingsForm(true); // Show settings form when settings is clicked
  };

  // Handle saving row edits
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      const updatedData = [...tableData];
      updatedData[row.index] = values;
      setTableData(updatedData);
      exitEditingMode();
    }
  };

  // Handle canceling row edits
  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  // Handle deleting a row
  const handleDeleteRow = useCallback(
    (row) => {
      if (!window.confirm(`Are you sure you want to delete ${row.getValue('name')}`)) {
        return;
      }
      const updatedData = [...tableData];
      updatedData.splice(row.index, 1); // Remove row from table data
      setTableData(updatedData);
    },
    [tableData],
  );

  // Handle row click to view counteragent details and invoices
  const handleRowClick = (row) => {
    setSelectedCounteragent(row.original);
  };

  // Handle form changes for new invoice
  const handleInvoiceChange = (e) => {
    const { name, value } = e.target;
    setNewInvoiceData({
      ...newInvoiceData,
      [name]: value,
    });
  };

  // Handle form submission for new invoice
  const handleNewInvoiceSubmit = () => {
    if (!newInvoiceData.id || !newInvoiceData.amount || !newInvoiceData.date) {
      alert('Please fill in all fields');
      return;
    }

    const updatedCounteragent = {
      ...selectedCounteragent,
      invoices: [
        ...selectedCounteragent.invoices,
        { ...newInvoiceData, amount: parseFloat(newInvoiceData.amount) },
      ],
    };
    setSelectedCounteragent(updatedCounteragent); // Update selected counteragent's invoices
    setNewInvoiceModalOpen(false); // Close the invoice modal
    setNewInvoiceData({ id: '', amount: '', date: '' }); // Reset form fields
  };

  // Common edit field props
  const getCommonEditTextFieldProps = useCallback(
    (cell) => ({
      error: !!validationErrors[cell.id],
      helperText: validationErrors[cell.id],
      onBlur: (event) => {
        const value = event.target.value;
        const isValid = validateRequired(value);
        if (!isValid) {
          setValidationErrors({
            ...validationErrors,
            [cell.id]: `${cell.column.columnDef.header} is required`,
          });
        } else {
          delete validationErrors[cell.id];
          setValidationErrors({
            ...validationErrors,
          });
        }
      },
    }),
    [validationErrors],
  );

  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'ID', enableColumnOrdering: false, enableEditing: false, enableSorting: false, size: 80 },
      { accessorKey: 'egn', header: 'EGN', size: 140, muiTableBodyCellEditTextFieldProps: ({ cell }) => ({ ...getCommonEditTextFieldProps(cell) }) },
      { accessorKey: 'bulstat', header: 'BULSTAT', size: 140, muiTableBodyCellEditTextFieldProps: ({ cell }) => ({ ...getCommonEditTextFieldProps(cell) }) },
      { accessorKey: 'clientType', header: 'Client Type', size: 140, muiTableBodyCellEditTextFieldProps: ({ cell }) => ({ ...getCommonEditTextFieldProps(cell) }) },
      { accessorKey: 'name', header: 'Name', size: 140, muiTableBodyCellEditTextFieldProps: ({ cell }) => ({ ...getCommonEditTextFieldProps(cell) }) },
      { accessorKey: 'surname', header: 'Surname', size: 140, muiTableBodyCellEditTextFieldProps: ({ cell }) => ({ ...getCommonEditTextFieldProps(cell) }) },
      { accessorKey: 'email', header: 'Email', size: 140, muiTableBodyCellEditTextFieldProps: ({ cell }) => ({ ...getCommonEditTextFieldProps(cell) }) },
      { accessorKey: 'phone', header: 'Phone', size: 140, muiTableBodyCellEditTextFieldProps: ({ cell }) => ({ ...getCommonEditTextFieldProps(cell) }) },
      { accessorKey: 'address', header: 'Address', size: 140, muiTableBodyCellEditTextFieldProps: ({ cell }) => ({ ...getCommonEditTextFieldProps(cell) }) },
    ],
    [getCommonEditTextFieldProps],
  );

  // Add mock data for invoices
  const invoicesForCounteragent = selectedCounteragent
    ? selectedCounteragent.invoices || [] // Mock invoice data for the selected counteragent
    : [];

  return (
    <>
      <Header onLoginClick={handleLoginClick} onSettingsClick={handleSettingsClick} /> {/* Add the header here */}
      
      <div className="app-layout">
        <Sidebar /> {/* Sidebar component */}
        <div className="layout-content">
          {/* Show LoginForm if the state is true */}
          {showLoginForm && <LoginForm closeModal={() => setShowLoginForm(false)} />}
  
          {/* Show SettingsForm if the state is true */}
          {showSettingsForm && <SettingsForm closeModal={() => setShowSettingsForm(false)} />}
  
          {/* Main content if neither form is shown */}
          {!showLoginForm && !showSettingsForm && (
            <>
              <MaterialReactTable
                columns={columns}
                data={tableData}
                editingMode="modal"
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
                      <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
                onRowClick={(row) => handleRowClick(row)}
              />
  
              {selectedCounteragent && (
                <Dialog open={Boolean(selectedCounteragent)} onClose={() => setSelectedCounteragent(null)}>
                  <DialogTitle>Counteragent Details</DialogTitle>
                  <DialogContent>
                    <Stack spacing={2}>
                      <Typography variant="h6">Invoice Summary</Typography>
                      {invoicesForCounteragent.length > 0 ? (
                        invoicesForCounteragent.map((invoice, index) => (
                          <Box key={index}>
                            <Typography>
                              Invoice #{invoice.id} - Amount: {invoice.amount} - Date: {invoice.date}
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Typography>No invoices found for this counteragent.</Typography>
                      )}
                    </Stack>
  
                    {/* Button to open New Invoice Modal */}
                    <Button color="primary" variant="contained" onClick={() => setNewInvoiceModalOpen(true)}>
                      Register New Invoice
                    </Button>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setSelectedCounteragent(null)}>Close</Button>
                  </DialogActions>
                </Dialog>
              )}
  
              {/* New Invoice Modal */}
              <Dialog open={newInvoiceModalOpen} onClose={() => setNewInvoiceModalOpen(false)}>
                <DialogTitle>Register New Invoice</DialogTitle>
                <DialogContent>
                  <Stack spacing={2}>
                    <TextField label="Invoice ID" name="id" value={newInvoiceData.id} onChange={handleInvoiceChange} />
                    <TextField label="Amount" name="amount" type="number" value={newInvoiceData.amount} onChange={handleInvoiceChange} />
                    <TextField label="Date" name="date" type="date" value={newInvoiceData.date} onChange={handleInvoiceChange} InputLabelProps={{ shrink: true }} />
                  </Stack>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setNewInvoiceModalOpen(false)}>Cancel</Button>
                  <Button onClick={handleNewInvoiceSubmit} color="primary">
                    Save Invoice
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ContractorViewTable;
