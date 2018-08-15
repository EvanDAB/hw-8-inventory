CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    stock INT NOT NULL,
    PRIMARY KEY (item_id)
);

ALTER TABLE products 
CHANGE COLUMN department_name department_name VARCHAR(255) NULL;
ALTER TABLE products 
CHANGE COLUMN price price INT NULL;
ALTER TABLE products 
CHANGE COLUMN stock stock INT NULL;

# J.I.C.
DROP TABLE products;
##

INSERT INTO products (item_id, product_name, department_name, price, stock) 
VALUES (1, 'PS4 Controller', 'Electronics', 64.50, 10), 
(2, '4K TV', 'Electronics', 899.99, 14), 
(3, 'Adidas Stan Smiths', 'Apparel', 74.99, 5), 
(4, 'Protein Powder', 'Health/ Nutrition', 34.99, 12),
(5, 'Electric Razor', 'Grooming', 49.99, 5),
(6, 'Stuffed Animal', 'Toys', 5.99, 3),
(7, 'Microwave', 'Home Applicances', 129.99, 20),
(8, 'Milk Frother', 'Home Appliances', 19.99, 30),
(9, 'Weekly Planner', 'Office Supplies', 12.99, 100),
(10, 'Popsocket for Iphone', 'Electronic Accessories', 19.99, 10)
;

SELECT *
FROM products;

UPDATE products
SET  = 'Alfred Schmidt', City= 'Frankfurt'
WHERE CustomerID = 1;