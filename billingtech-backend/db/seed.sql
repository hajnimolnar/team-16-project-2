
-- Insert sample users
INSERT INTO users (username, email, password_hash) VALUES 
('alice', 'alice@example.com', 'hashed_password_1'),
('bob', 'bob@example.com', 'hashed_password_2');

-- Insert sample invoices
INSERT INTO invoices (user_id, invoice_date, total_amount, status) VALUES 
(1, '2023-01-01', 150.00, 'Paid'),
(1, '2023-02-01', 200.00, 'Unpaid'),
(2, '2023-03-01', 120.00, 'Paid');

-- Insert sample line items
INSERT INTO line_items (invoice_id, description, quantity, unit_price, total_price) VALUES 
(1, 'Service A', 1, 100.00, 100.00),
(1, 'Service B', 1, 50.00, 50.00),
(2, 'Service C', 2, 100.00, 200.00),
(3, 'Service D', 1, 120.00, 120.00);

-- Insert sample change request
INSERT INTO change_requests (line_item_id, user_id, request_description, status) VALUES 
(1, 1, 'Change quantity to 2', 'Pending');

-- Insert sample refund request
INSERT INTO refund_requests (invoice_id, user_id, request_description, status) VALUES 
(2, 1, 'Requesting refund due to duplicate charge', 'Pending');
