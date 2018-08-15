//Shows the DB and also asks the questions
//Parts 1-6 done
//Work on 7 and 8

var mysql = require("mysql");
var checkQ, checkP;

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 8889,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    readProducts1();
  });

function readProducts1() {
    console.log("Selecting all products...\n");
    connection.query("SELECT item_id, product_name, price  FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        // connection.end();
        startInq();
    });
    
}

var inquirer = require("inquirer");
function startInq() {
    inquirer
    .prompt([
        // Here we create a basic text prompt.
        {
        type: "input",
        message: "What would you like to buy?",
        name: "product"
        },
        {
        type: "input",
        message: "How many would you like to buy?",
        name: "quantity"
        }
    ])
    .then(function(inquirerResponse) {
        console.log(inquirerResponse);
        console.log('So you want ' + inquirerResponse.quantity + ' ' + inquirerResponse.product + 's');
        console.log("Lets see if we can get that for you..\n");
        connection.query(
            "SELECT stock FROM products WHERE ?",
            [
                {product_name: inquirerResponse.product}
                // {stock: inquirerResponse.quantiy}
            ],
             function(err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                var result = JSON.stringify(res);
                console.log(result.stock.val);
                

            }   
    );
        // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
        // if (inquirerResponse.quantity != '') {
        //     readProducts2();
        //     console.log("\nWe have" + inquireResponse.quantity + "many  of ");
        // } else {
        //     console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
        // }
    });
}

function updateProduct() {
    console.log("Updating all Rocky Road quantities...\n");
    connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          quantity: 100
        },
        {
          address: "Rocky Road" //the item is
        }
      ],
      function(err, res) {
        console.log(res.affectedRows + " products updated!\n");
        // Call deleteProduct AFTER the UPDATE completes
        deleteProduct();
      }
    );
}
  
// 'UPDATE products SET quantity = ? WHERE address = ?'
// connection.query