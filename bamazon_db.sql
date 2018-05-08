DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db; 
USE bamaozon_db;

CREATE TABLE products (
	item_id INTEGER (11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (255) NOT NULL,
	department_name VARCHAR (30) NOT NULL,
	price DECIMAL (11),
	stock_quantity INTEGER (11)
);

insert into products (id, product_name, department_name, price, stock_quantity) 
    values (1, 'USB C to USB 3.0 Adapter', 'Electronics', '$9.99', 43);
insert into products (id, product_name, department_name, price, stock_quantity) 
    values (2, 'Red Bull Sugarfree, 24 Pack', 'Grocery', '$35.99', 68);
insert into products (id, product_name, department_name, price, stock_quantity) 
    values (3, 'HDMI Cable', 'Electronics', '$14.99', 97);
insert into products (id, product_name, department_name, price, stock_quantity) 
    values (4, 'Apple iPad Pro', 'Electronics', '$949.00', 55);
insert into products (id, product_name, department_name, price, stock_quantity) 
    values (5, 'Apple Mac Pro', 'Electronics', '$3,999.00', 59);
insert into products (id, product_name, department_name, price, stock_quantity) 
    values (6, 'Cyrus Workstation', 'Furniture', '$167.69', 13);
insert into products (id, product_name, department_name, price, stock_quantity) 
    values (7, 'The Matrix Trilogy', 'Movies & TV', '$19.95', 13);
insert into products (id, product_name, department_name, price, stock_quantity) 
    values (8, 'Sing It Back (Dave Cortex, Joshua Harnois Remix', 'Digital Music', '$0.69', 32);
insert into products (id, product_name, department_name, price, stock_quantity) 
    values (9, 'Moog Subsequent 37 Analog Synthesizer', 'Musical Instruments', '$1,499.00', 10);
insert into products (id, product_name, department_name, price, stock_quantity) 
    values (10, 'Killerspin Diamond CQ Ping Pong Paddle', 'Sports & Outdoors', '$232.99', 100);