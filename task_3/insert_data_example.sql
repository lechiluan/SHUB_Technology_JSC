-- Insert sample data into Gas Stations
INSERT INTO gas_stations (code, name, address, manager, phone_number, email) VALUES
('GS001', 'Trạm Xăng 1', '123 Đường ABC, Quận 1, TP.HCM', 'Nguyễn Văn A', '0123456789', 'tramxang1@example.com'),
('GS002', 'Trạm Xăng 2', '456 Đường DEF, Quận 2, TP.HCM', 'Trần Thị B', '0987654321', 'tramxang2@example.com'),
('GS003', 'Trạm Xăng 3', '789 Đường GHI, Quận 3, TP.HCM', 'Lê Văn C', '0123987654', 'tramxang3@example.com');

-- Insert sample data into Products
INSERT INTO products (code, name, price, currency) VALUES
('P001', 'Xăng A95', 23000.00, 'VND'),
('P002', 'Xăng E5', 22000.00, 'VND'),
('P003', 'Dầu DO', 24000.00, 'VND');

-- Insert sample data into Pumps
INSERT INTO pumps (station_id, product_id, pump_number) VALUES
(1, 1, 'Bơm 1'),
(1, 2, 'Bơm 2'),
(2, 3, 'Bơm 3'),
(3, 1, 'Bơm 4');

-- Insert sample data into Customers
INSERT INTO customers (customer_code, customer_name, type_of_customer, license_number) VALUES
('CUST001', 'Khách lẻ', 'Khách lẻ', ''),
('CUST002', 'Khách lẻ', 'Khách lẻ', ''),
('CUST003', 'Công ty TNHH ABC', 'Công ty', '63B2-75231');

-- Insert sample data into Transactions
INSERT INTO transactions (station_id, pump_id, product_id, transaction_date, quantity, total_price, payment_method, payment_status, customer_id) VALUES
(1, 1, 1, '2024-10-01 10:00:00', 10, 230000.00, 'Tiền mặt', 'Hoàn tất', 1),
(1, 2, 2, '2024-10-01 10:05:00', 5, 110000.00, 'Thẻ', 'Hoàn tất', 2),
(2, 3, 3, '2024-10-01 10:10:00', 8, 192000.00, 'Tiền mặt', 'Đang xử lý', 3),
(3, 4, 1, '2024-10-01 10:15:00', 15, 345000.00, 'Tiền mặt', 'Hoàn tất', NULL);
