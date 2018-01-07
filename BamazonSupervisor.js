var mysql = require("mysql");
var inquirer = require("inquirer");
var console1 = require("console.table");

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
                    addNewDept()
                    break;
            }
        });
};

function allView() {


    var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS product_sales,  CONCAT (departments.over_head_costs, SUM(products.product_sales)) AS total_profit FROM departments LEFT JOIN products ON (departments.department_name = products.department_name) GROUP BY department_id;"

    connection.query(query, function(err, res) {


        if (err) throw err;

        console.log("\nBelow please find the product sales by department: \n  | department_id | department_name | over_head_costs | product_sales | total_profit |");

        for (var i = 0; i < res.length; i++) {
            var sales = parseInt(res[i].product_sales);
            var totalProfits = parseInt(res[i].product_sales + res[i].over_head_costs);

            console.log("|                " + res[i].department_id + "|     " + res[i].department_name + "|           " + res[i].over_head_costs + "|              " + sales + "|       " + totalProfits);
        }

        finish();
    });
};

function addNewDept() {
    inquirer
        .prompt([{
                name: "department",
                type: "input",
                message: "What department do you want to create?"
            },

            {
                name: "cost",
                type: "input",
                message: "What are the overhead costs for this department?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }

        ]).then(function(answer) {
            connection.query(
                "INSERT INTO departments SET ?", {
                    department_name: answer.department,
                    over_head_costs: answer.cost

                },

                function(err) {
                    if (err) throw err;
                    console.log("The new department has been added to the departments database.");
                    finish();
                }
            );
        });
};

function finish() {
    inquirer
        .prompt({
            name: "finish",
            type: "rawlist",
            message: "Would you like to [Perform Another Action] or [End Your Session]?",
            choices: ["Perform", "End"]
        })
        .then(function(answer) {

            if (answer.finish.toUpperCase() === "PERFORM") {
                start();
            } else {
                console.log("Thank you and keep up the good work.");
                connection.end();

            }
        });
}



//console.log("\nBelow please find the product sales by department: \n  | department_id | department_name | over_head_costs | product_sales | total_profit |");
//console.log("\nBelow please find the product sales by department:\n| department_id | department_name | over_head_costs |"); 
//console.log("|---------------|-----------------|-----------------|")
// console.table([{
//    department_id: "",
//    department_name: "",
//    over_head_costs: "",
//    product_sales: "",
// }]);

//var values = [res[i].department_id, res[i].department_name, res[i].over_head_costs, sales];
//console.table(['department_id', 'department_name', 'over_head_costs', 'product_sales'], values);
//console.log(values);

//       var di
//       var dn
//       var over
//       var sale
// console.log("\nBelow please find the product sales by department: \n  | department_id | department_name | over_head_costs | product_sales | total_profit |");


//           di = res[i].department_id;
///            dn = res[i].department_name;
//            over = res[i].over_head_costs;
//           sale = sales;

//            console.table([{
//               department_id: di,
//               over_head_costs: dn,
//              product_sales: over,
//               total_profit: sales,
//          }]);