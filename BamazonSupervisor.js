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
            message: "\nWelcome Supervisor!  What would you like to do?",
            choices: [
                "View Product Sales by Department",
                "Create New Department"

            ]
        })
        .then(function(answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    allView();
                    break;

                case "Create New Department":
                    create();
                    break;


            }
        });
};