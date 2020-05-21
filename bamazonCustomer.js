var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "teamarie",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  runTable();
});

function runTable() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.table([
        {
          id: res[i].id,
          Product: res[i].product_name,
          Price: res[i].price,
          Quantity: res[i].stock_quantity
        }
      ]);
    }
    buyProduct();
  });
}

function buyProduct() {
  inquirer
    .prompt([
      {
        type: "number",
        message: "What is the ID of the product you would like to buy",
        name: "idInput"
      },
      {
        type: "number",
        message: "How many would you like to purchase?",
        name: "quantity"
      }
    ])
    .then(function(response) {
      checkProduct(response);
    });
}

function checkProduct(response) {
  connection.query(
    `SELECT stock_quantity FROM products WHERE id = ${parseInt(
      response.idInput
    )}`,
    function(err, res) {
      if (err) throw err;

      if (response.quantity > res[0].stock_quantity) {
        console.log("Not enough quantity");
        buyProduct();
      } else {
        subtractProduct(response);
      }
    }
  );
}

function subtractProduct(response) {
  connection.query(
    `UPDATE products
    SET stock_quantity = stock_quantity - ${response.quantity}
    WHERE id = ${parseInt(response.idInput)}`,
    function(err, res) {
      if (err) throw err;

      giveTotal(response);
    }
  );
}

function giveTotal(response) {
  connection.query(
    `SELECT price FROM products WHERE id = ${parseInt(response.idInput)}`,
    function(err, res) {
      if (err) throw err;

      var total = response.quantity * res[0].price;

      console.log(`your total is $${total}`);
      

      connection.end();
    }
  );
}
