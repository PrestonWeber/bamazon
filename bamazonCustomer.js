var mysql = require("mysql");




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
    afterConnection();
});

function afterConnection(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}