-- Create database
CREATE DATABASE gas_station_management;

-- Drop tables if exists
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS pumps CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS gas_stations CASCADE;

-- Create table for Gas Stations
CREATE TABLE gas_stations (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    manager VARCHAR(255),
    phone_number VARCHAR(20),
    email VARCHAR(255)
);
-- Indexes for gas_stations
CREATE INDEX idx_gas_stations_code ON gas_stations(code);
CREATE INDEX idx_gas_stations_name ON gas_stations(name);
CREATE INDEX idx_gas_stations_phone_number ON gas_stations(phone_number);

-- Create table for Products
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL
);
-- Indexes for products
CREATE INDEX idx_products_code ON products(code);
CREATE INDEX idx_products_name ON products(name);

-- Create table for Pumps
CREATE TABLE pumps (
    id SERIAL PRIMARY KEY,
    station_id INT REFERENCES gas_stations(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    pump_number VARCHAR(50) NOT NULL
);
-- Indexes for pumps
CREATE INDEX idx_pumps_station_id ON pumps(station_id);
CREATE INDEX idx_pumps_product_id ON pumps(product_id);

-- Create table for Customers (optional)
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    customer_code VARCHAR(20) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    type_of_customer VARCHAR(50) NOT NULL,
    license_number VARCHAR(50) NOT NULL
);
-- Indexes for customers
CREATE INDEX idx_customers_customer_code ON customers(customer_code);
CREATE INDEX idx_customers_customer_name ON customers(customer_name);

-- Create table for Transactions
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    station_id INT REFERENCES gas_stations(id) ON DELETE CASCADE,
    pump_id INT REFERENCES pumps(id),
    product_id INT REFERENCES products(id),
    transaction_date TIMESTAMP NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_status VARCHAR(50) NOT NULL,
    customer_id INT REFERENCES customers(id)
);
-- Indexes for transactions
CREATE INDEX idx_transactions_station_id ON transactions(station_id);
CREATE INDEX idx_transactions_pump_id ON transactions(pump_id);
CREATE INDEX idx_transactions_product_id ON transactions(product_id);
CREATE INDEX idx_transactions_transaction_date ON transactions(transaction_date);
