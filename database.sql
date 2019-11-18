DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
	id int AUTO_INCREMENT NOT NULL,
    product_name varchar(30) NOT NULL,
    department_name varchar(30) NOT NULL,
    price INTEGER(10),
    stock_quantity INTEGER(10),
    PRIMARY KEY(id)
    );
    
	INSERT INTO products(product_name, department_name, price, stock_quantity)
    VALUES ("Laptop", "electronics", 800, 10);
    INSERT INTO products(product_name, department_name, price, stock_quantity)
    VALUES ("Nintendo Switch", "electronics", 300, 6);
    INSERT INTO products(product_name, department_name, price, stock_quantity)
    VALUES ("Playstation", "electronics", 400, 12);
    INSERT INTO products(product_name, department_name, price, stock_quantity)
    VALUES ("Plunger", "Plumbing", 20, 25);
    INSERT INTO products(product_name, department_name, price, stock_quantity)
    VALUES ("Pipes", "Plumbing", 25, 20);
    INSERT INTO products(product_name, department_name, price, stock_quantity)
    VALUES ("Duct Tape", "General", 15, 30);
    INSERT INTO products(product_name, department_name, price, stock_quantity)
    VALUES ("W-D 40", "General", 15, 30);
    INSERT INTO products(product_name, department_name, price, stock_quantity)
    VALUES ("Screw Driver", "Tools", 15, 25);
    INSERT INTO products(product_name, department_name, price, stock_quantity)
    VALUES ("Drill", "Tools", 90, 10);
    INSERT INTO products(product_name, department_name, price, stock_quantity)
    VALUES ("Band Saw", "Tools", 80, 7);