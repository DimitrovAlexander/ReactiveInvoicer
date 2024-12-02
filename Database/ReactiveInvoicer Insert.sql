-- Добавяне на данни в таблицата PARTNER
INSERT INTO [dbo].[PARTNER] (PARTNER_ID, PARTNER_NAME, PARTNER_SURNAME, PARTNER_LASTNAME, PARTNERT_FULLNAME, PARTNER_EGN, PARTNER_BULSTAT, PARTNER_EMAIL, PARTNER_PHONE, PARTNER_ADDRESS)
VALUES 
(1, 'John', 'A.', 'Doe', 'John A. Doe', '1234567890', NULL, 'john.doe@example.com', '1234567890', '123 Main St'),
(2, 'Jane', 'B.', 'Smith', 'Jane B. Smith', '0987654321', NULL, 'jane.smith@example.com', '0987654321', '456 Elm St'),
(3, 'Bob', 'C.', 'Johnson', 'Bob C. Johnson', '4561237890', NULL, 'bob.johnson@example.com', '4561237890', '789 Oak St');

-- Добавяне на данни в таблицата INVOICE_TYPE
INSERT INTO [dbo].[INVOICE_TYPE] (TYPE_ID, TYPE_NAME)
VALUES 
(1, 'Standard'),
(2, 'Credit'),
(3, 'Debit');

-- Добавяне на данни в таблицата INVOICE
INSERT INTO [dbo].[INVOICE] (PARTNER_ID, INVOCIE_NO, INVOCIE_DATE, INVOICE_TYPE, INVOICE_, INVOICE_STATUS, INVOICE_VALUE, INVOICE_NOTE)
VALUES 
(1, 'INV-001', '2024-01-15', 1, '2024-01-15', 'P', 500.00, 'Paid invoice'),
(1, 'INV-002', '2024-02-01', 2, '2024-02-01', 'U', 300.00, 'Unpaid invoice'),
(2, 'INV-003', '2024-03-10', 1, '2024-03-10', 'P', 150.00, 'Paid invoice'),
(3, 'INV-004', '2024-04-05', 3, '2024-04-05', 'U', 700.00, 'Unpaid invoice'),
(3, 'INV-005', '2024-05-20', 1, '2024-05-20', 'P', 400.00, 'Paid invoice');

-- Добавяне на данни в таблицата PAYMENTS
INSERT INTO [dbo].[PAYMENTS] (INVOICE_ID, PAYMENT_DATE, PAYMENT_VALUE)
VALUES 
(1, '2024-01-20', 500.00),
(3, '2024-03-15', 150.00),
(5, '2024-05-25', 400.00);

-- Добавяне на данни в таблицата USERS
INSERT INTO [dbo].[USERS] (Id, FirstName, LastName, Username, Password, Role)
VALUES 
('1', 'Admin', 'User', 'admin', 'adminpass', 'Admin'),
('2', 'John', 'Doe', 'johndoe', 'password123', 'User'),
('3', 'Jane', 'Smith', 'janesmith', 'securepass', 'User');
