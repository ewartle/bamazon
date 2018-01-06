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
    console.log("connected as id " + connection.threadId);
    start();


});


function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "\nWelcome Manager!  What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    allAvailable();
                    break;

                case "View Low Inventory":
                    low();
                    break;

                case "Add to Inventory":
                    addInv();
                    break;

                case "Add New Product":
                    addNew();
                    break;
            }
        });
};

function allAvailable() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("\nThe following products are in stock and available for sale: \n");
        for (var i = 0; i < res.length; i++) {
            console.log("ID:  " + res[i].id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity);
        }
        start();
    });
};

function low() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("\nThe following products are in stock, but the inventory for each is less than 5: \n");
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                console.log("ID:  " + res[i].id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity);
            }
        }
        start();
    });
};

function addInv() {

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("\nHere are the current items in inventory: \n")
        for (var i = 0; i < res.length; i++) {
            console.log("ID:  " + res[i].id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity);

        }
        inquirer
            .prompt([{
                    name: "choice",
                    type: "input",
                    message: "\nSelect the ID for the product for which you want to add inventory."
                },
                {
                    name: "amount",
                    type: "input",
                    message: "\nHow much inventory do you want to add?"
                },

            ]).then(function(answer) {

                var chosenItem;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].id === parseInt(answer.choice)) {
                        chosenItem = res[i];
                    }
                }
                var quantity = parseInt(answer.amount);
                connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: chosenItem.stock_quantity + quantity
                        },
                        {
                            product_name: chosenItem.product_name
                        }
                    ],
                    function(err, res) {

                        if (err) throw err;
                        console.log(res.affectedRows + " products updated!\n");
                        start();
                    }
                );

            });


    });
};

function addNew() {
    inquirer
        .prompt([{
                name: "product",
                type: "input",
                message: "What product do you want to add to inventory?"
            },
            {
                name: "department",
                type: "input",
                message: "What department is the product in?"
            },
            {
                name: "price",
                type: "input",
                message: "What is the unit price of the product?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many of the product will you add to inventory?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function(answer) {
            connection.query(
                "INSERT INTO products SET ?", {
                    product_name: answer.product,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.quantity
                },
                function(err) {
                    if (err) throw err;
                    console.log("Your product has been added to inventory");
                    start();
                }
            );
        });
};