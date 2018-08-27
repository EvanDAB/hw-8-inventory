var mysql = require("mysql");
var result, start, end, stock, newq, price;

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
            "SELECT stock FROM products WHERE product_name = ?",
            [
                inquirerResponse.product
                // {stock: inquirerResponse.quantity}
            ],
             function(err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                result = JSON.stringify(res);
                start = result.indexOf(':');
                end = result.indexOf('}');
                stock = result.slice(start + 1, end)
                console.log(stock);
                if (newq <= 0) console.log('We ran out of that. Sorry');
                if(parseInt(stock) < inquirerResponse.quantity) console.log(`Insufficient quantity!`)
                else {
                    newq =  parseInt(stock) - inquirerResponse.quantity;
                    connection.query(
                        'UPDATE product SET stock = ? WHERE product_name = ?',
                        [
                            newq,
                            inquirerResponse.product
                        ],
                        function(err, res) {
                            console.log("Current stock of " + inquirerResponse.product + ' is ' + newq);
                            console.log(newq);
                        }
                    );
                }
                connection.query(
                    'SELECT price FROM products where product_name = ?',
                    [inquirerResponse.product],
                    function(err, res) {
                        result = JSON.stringify(res);
                        start = result.indexOf(':');
                        end = result.indexOf('}');
                        price = result.slice(start + 1, end)
                        console.log('For ' + inquirerResponse.quantity + 'that will be $' + parseInt(price) * inquirerResponse.quantity);
                    }
                );
            }   
        );
        
    });
}
