
INSERT INTO [dbo].[PARTNER] (PARTNER_ID, PARTNER_NAME, PARTNER_SURNAME, PARTNER_LASTNAME, PARTNERT_FULLNAME, PARTNER_EGN, PARTNER_BULSTAT, PARTNER_EMAIL, PARTNER_PHONE, PARTNER_ADDRESS)
VALUES 
(1, 'John', 'A.', 'Doe', 'John A. Doe', '1234567890', NULL, 'john.doe@example.com', '1234567890', '123 Main St'),
(2, 'Jane', 'B.', 'Smith', 'Jane B. Smith', '0987654321', NULL, 'jane.smith@example.com', '0987654321', '456 Elm St'),
(3, 'Bob', 'C.', 'Johnson', 'Bob C. Johnson', '4561237890', NULL, 'bob.johnson@example.com', '4561237890', '789 Oak St');


INSERT INTO [dbo].[INVOICE_TYPE] (TYPE_ID, TYPE_NAME)
VALUES 
(1, 'Income'),
(2, 'Expense');

INSERT INTO [dbo].[INVOICE] (PARTNER_ID, INVOCIE_NO, INVOCIE_DATE, INVOICE_TYPE, INVOICE_, INVOICE_STATUS, INVOICE_VALUE, INVOICE_NOTE)
VALUES 
(1, '001', '2024-11-15', 1, '2024-11-25', 'P', 500.00, 'Materials'),
(1, '002', '2024-12-01', 2, '2024-12-11', 'U', 300.00, 'Tools'),
(2, '003', '2024-10-10', 1, '2024-12-19', 'P', 150.00, 'Office materials'),
(3, '004', '2024-09-05', 2, '2024-10-05', 'U', 700.00, 'Office materials'),
(3, '005', '2024-09-20', 1, '2024-09-30', 'P', 400.00, 'Office printer');


INSERT INTO [dbo].[PAYMENTS] (INVOICE_ID, PAYMENT_DATE, PAYMENT_VALUE)
VALUES 
(1, '2024-11-20', 500.00),
(3, '2024-10-15', 150.00),
(5, '2024-09-25', 400.00);


INSERT INTO [dbo].[USERS] (Id, Username, Password, Role)
VALUES 
('8fd305fd-c6c4-47cd-a63a-adf6e81d8a53', 'admin', '74913f5cd5f61ec0bcfdb775414c2fb3d161b620', 'Admin');

