const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "teamarie",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  managerOptions();
});

function managerOptions() {
  inquirer
    .prompt([
      {
        type: `list`,
        message: `Choose an option`,
        choices: [`View Products for Sale`, `View Low Inventory`, `Add to Inventory`, `Add a new Product`, `Exit`],
        name: `options`
      }
    ])
    .then(function(response) {
      switch (response.options) {
        case `View Products for Sale`:
          viewProducts();
          break;
        case `View Low Inventory`:
          lowInventory();
          break;
        case `Add to Inventory`:
          addInventory();
          break;
        case `Add a new Product`:
          addProduct();
          break;
        case `Exit`:
          escape();
        default:
      }
    });
}

function viewProducts() {
  connection.query(`SELECT * FROM products`, function(err, res) {
    if (err) throw err;
    for (let idx = 0; idx < res.length; idx++) {
      console.table([
        {
          id: res[idx].id,
          Product: res[idx].product_name,
          Price: res[idx].price,
          Quantity: res[idx].stock_quantity
        }
      ]);
    }
    managerOptions();
  });
}

function lowInventory() {
  connection.query(`SELECT * FROM products WHERE stock_quantity < 5`, function(
    err,
    res
  ) {
    if (err) throw err;
    for (let idx = 0; idx < res.length; idx++) {
      console.table([
        {
          id: res[idx].id,
          Product: res[idx].product_name,
          Price: res[idx].price,
          Quantity: res[idx].stock_quantity
        }
      ]);
    }
    managerOptions();
  });
}

function addInventory() {
  connection.query(`SELECT * FROM products`, function(err, res) {
    if (err) throw err;
    for (let idx = 0; idx < res.length; idx++) {
      var name = console.table([
        {
          id: res[idx].id,
          name: res[idx].product_name,
          quantity: res[idx].stock_quantity
        }
      ]);
    }
    inquirer
      .prompt([
        {
          type: `number`,
          message: `What is the id of the product you would like add inventory for?\n ${name}`,
          name: `productId`
        },
        {
          type: `number`,
          message: `How many items would you like to add to the stock`,
          name: `quantity`
        }
      ])
      .then(function(response) {
        connection.query(
          `UPDATE products SET stock_quantity = stock_quantity + ${response.quantity}`,
          function(err, res) {
            if (err) throw err;
            managerOptions();
          }
        );
      });
  });
}

function addProduct() {
  inquirer
    .prompt([
      {
        type: `string`,
        message: `What is the name of the product you would like to add.`,
        name: `productName`
      },
      {
        type: `string`,
        message: `what is the department you would like to add this to?`,
        name: `department`
      },
      {
        type: "number",
        message: `What is the price of this product?`,
        name: `price`
      },
      {
        type: "number",
        message: `How many would you like to add to stock`,
        name: `quantity`
      }
    ])
    .then(function(response) {
      connection.query(
        `INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("${response.productName}", "${response.department}", ${response.price}, ${response.quantity});`,
        function(err, res) {
          if (err) throw err;
          managerOptions();
        }
      );
    });
}

function escape() {
  connection.end();
}
