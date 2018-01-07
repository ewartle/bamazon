CREATE DataBase bamazon_db;
USE bamazon_db;

CREATE TABLE products

(
id INTEGER(11) NOT NULL AUTO_INCREMENT,
product_name VARCHAR (250), NOT NULL,
department_name VARCHAR (250), NOT NULL,
price INTEGER (11),
stock_quantity INTEGER (11),
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ("diamond necklace", "jewelry", 500, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("pearl earrings", "jewelry", 250, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("wool sweater", "clothing", 40, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("swimsuit", "clothing", 50, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("coffee maker", "homegoods", 30, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("frying pan", "homegoods", 25, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("barbie", "toys", 15, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("twister", "toys" 15, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("notebook", "school/office supplies", 2, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("markers", "school/office supplies", 1, 50);




--adding new column to existing table
ALTER TABLE products,
ADD product_sales INTEGER (11),



--Creating new table departments
CREATE TABLE departments

(
department_id INTEGER(11) NOT NULL AUTO_INCREMENT,
department_name VARCHAR (250), NOT NULL,
over_head_costs INTEGER (11),

PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs) values ("jewelry", 5000);
INSERT INTO departments (department_name, over_head_costs) values ("clothing", 4000);
INSERT INTO departments (department_name, over_head_costs) values ("homegoods", 9000);
INSERT INTO departments (department_name, over_head_costs) values ("toys", 2000);
INSERT INTO departments (department_name, over_head_costs) values ("school/office supplies", 3000);

