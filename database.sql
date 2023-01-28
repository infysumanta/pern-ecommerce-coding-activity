CREATE DATABASE ecommerce;

CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  orderDescription VARCHAR(100) NOT NUll,
  createdAt TIMESTAMP NOT NUll
);

CREATE TABLE products(
  id INT PRIMARY KEY,
  productName VARCHAR(100) NOT NUll,
  productDescription TEXT
);

CREATE TABLE OrderProductMap(
  id SERIAL PRIMARY KEY,
  orderId INT NOT NULL,
  productId INT NOT NULL,
  CONSTRAINT fk_order FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_product FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO products(id, productname, productdescription) VALUES 
(1, 'HP Laptop', 'This is HP Laptop'),
(2, 'Lenovo Laptop', 'This is Lenovo Laptop'),
(3, 'Car', 'This is Car'),
(4, 'Bike', 'This is Bike');