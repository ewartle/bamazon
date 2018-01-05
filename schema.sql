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
