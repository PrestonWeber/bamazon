var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "teamarie",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    runTable();
});

function runTable(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.table([
                {   
                    id: res[i].id,
                    Product: res[i].product_name,
                    Price: res[i].price
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
            name: "id-input"
        },
        {
            type: "number",
            message: "How many would you like to purchase?",
            name: "quantity"
        }
    ]).then(function(response) {
        checkProduct(response);
    });
            
       
}


function checkProduct(response) {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for(i=0; i < res.length; i++) {
            if (response.quantity > res[i].stock_quantity){
                console.log("not enough quantity");
            }
            else{
            subtractProduct(response);
            }
        }
    });
}

function subtractProduct (response) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - " 
    + response.quantity + "WHERE productsID = " 
    + response.id-input, function (err, res) {
        if (err) throw err;
        runTable();
    });
}

