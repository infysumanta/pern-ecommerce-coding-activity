# Welcome to Order Management Coding Activity 👋

[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/infysumanta/pern-ecommerce-coding-activity#readme)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/infysumanta/pern-ecommerce-coding-activity/graphs/commit-activity)
[![License: ISC](https://img.shields.io/github/license/infysumanta/pern-ecommerce-coding-activity)](https://github.com/infysumanta/pern-ecommerce-coding-activity/blob/master/LICENSE)
[![Twitter: infysumanta](https://img.shields.io/twitter/follow/infysumanta.svg?style=social)](https://twitter.com/infysumanta)

> MERN Basic Ecommerce Application for Coding Activity

## 🏠 [Homepage](https://github.com/infysumanta/pern-ecommerce-coding-activity#readme)

#

## Clone the Project

```sh
# if you are using https mode
$ git clone https://github.com/infysumanta/pern-ecommerce-coding-activity

# if you are using ssh mode
$ git clone git@github.com:infysumanta/pern-ecommerce-coding-activity.git

# if you are using github cli tools
$ gh repo clone infysumanta/pern-ecommerce-coding-activity


```

```sh

```

## Install

### Server Side

```sh
# Change the directory to the project root
$ cd pern-ecommerce-coding-activity

$ npm install

```

### Client Side

```sh

# to change the directory for client
$ cd client
$ npm install
```

## Post Install Configuration

> Create PostgreSQL Database and run the below commands

#### you can open the [database.sql](/database.sql) file from root folder for the same commands

```sql
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

```

> Copy the environment variable configuration file with below methods

```sh
$cp .env.example .env
```

```sh
# update the environment variable as below inside .env file
PORT=5000 <Server Port>#\*\*
DB_USER=Your Database Username
DB_PASS=Your Database Password
DB_HOST=Your Database HOST
DB_PORT=Your Database Port
DB_NAME=Your Database Name
NODE_ENV= development / production

#\*\* Server Port (please update on package.json inside client folder of proxy key as per Server Port)

# <Root Project>/client/package.json

# "proxy": "http://localhost:<Server PORT></Server>",

```

## Usage

### Development

```sh
$ npm run dev
```

### Production

```sh
$ npm run start
```

<!-- ## Run tests

```sh
npm test
``` -->

## Screenshots

|                                                                  |                                                                                |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| ![Order Management Page     ](/screenshots/order_management.png) | ![Order Management with Search Page](/screenshots/order_management_search.png) |
| Order Management Page                                            | Order Management with Search Page                                              |
| ![New Order Create Page   ](/screenshots/new_order.png)          | ![ Edit Order Page](/screenshots/edit_page.png)                                |
| New Order Create Page                                            | Edit Order Page                                                                |

## Author

👤 **Sumanta Kabiraj**

- Website: https://sumantakabiraj.com
- Twitter: [@infysumanta](https://twitter.com/infysumanta)
- Github: [@infysumanta](https://github.com/infysumanta)
- LinkedIn: [@sumanta-kabiraj](https://linkedin.com/in/sumanta-kabiraj)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/infysumanta/pern-ecommerce-coding-activity/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [Sumanta Kabiraj](https://github.com/infysumanta).

This project is [ISC](https://github.com/infysumanta/pern-ecommerce-coding-activity/blob/master/LICENSE) licensed.

---
