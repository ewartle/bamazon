var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "Tuckerjj1977!@#",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
   // console.log("connected as id " + connection.threadId);
    start();
    
});


function start() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("\nWelcome to Bamazon! The following products are avaiable for purchase: \n");
        for (var i = 0; i < res.length; i++) {
            console.log("ID:  " + res[i].id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price);
        }
        inquirer
            .prompt([{
                    name: "choice",
                    type: "input",
                    message: "\nPlease enter the ID of the product you would like to purchase."

                },
                {
                    name: "amount",
                    type: "input",
                    message: "\nHow many would you like to purchase?"
                }

            ]).then(function(answer) {

                var chosenItem;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].id === parseInt(answer.choice)) {
                        chosenItem = res[i];
                    }
                }
                var quantity = answer.amount;
                var cost = quantity * parseInt(chosenItem.price);
                console.log("item chosen: " + chosenItem.product_name);
                console.log("quantity: " + quantity);
                console.log("cost: " + cost);

                if (quantity <= chosenItem.stock_quantity) {

                  //  console.log("Updating stock quantity...\n");
                    var query = connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                                stock_quantity: chosenItem.stock_quantity - quantity
                            },
                            {
                                product_name: chosenItem.product_name
                            }
                        ],
                        function(err, res) {
                            console.log(res.affectedRows + " quantity updated!\n");
                        }
                    );

                    var query = connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                                product_sales: cost
                            },
                            {
                                product_name: chosenItem.product_name
                            }
                        ],
                        function(err, res) {
                           console.log(res.affectedRows + " product sales updated!\n");
                        }
                    );
                    console.log("\n We hope you enjoy your purchase of " + quantity + " " + chosenItem.product_name + "(s).  The total cost of your order is $" + cost + ".  Your order will be shipped shortly.  \n We appreciate any feedback you may have on your purchase. \n");
                    start();
                } else {
                    console.log("\n We are sorry.  We only have " + chosenItem.stock_quantity + " left in stock.  Please check in at a later time. \n")
                    start();
                    
                }

            });
    });
};