// Dependencies
const mysql = require('mysql'),
      inquirer = require('inquirer'),

    // Create MySQL connection
     connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'bamazon_db'
      });

      // Initialize MySQL connecion
      connection.connect((err) => {
        if (err) throw err;
        // console.log('Connected!');
        // displayProducts();
        makeTable();
      });

// Print items in DB to screen
var makeTable = function(){
    connection.query("SELECT * FROM products", function(err,res) {
        for(var i=0; i<res.length; i++) {
            console.log(res[i].item_id + ' || ' + res[i].product_name + ' || ' + res[i].department_name + ' || ' + res[i].price + ' || ' + res[i].stock_quantity + '\n');
        }
    promptCustomer(res);
    })
}

// Ask customer which item they would like to buy
var promptCustomer = function(res) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'choice',
            message: 'Which item number would you like to purchase? [Quit with Q]'
        }
    ]).then(function(answer) {
        var correct = false;
        // Enter Q to quit
        if(answer.choice.toUpperCase() == 'Q') {
            process.exit();
        }
        for(var i = 0; i < res.length; i++) {
            if(res[i].item_id == answer.choice) {
                correct = true;
                var product = answer.choice;
                var id = i;

                // Ask customer how many they would like to buy
                inquirer.prompt(
                    {
                        type: 'input',
                        name: 'quant',
                        message: 'How many would you like to buy?',
                        validate: function(value) {
                            if(isNaN(value) == false) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }).then(function(answer) {
                        if((res[id].stock_quantity-answer.quant) > 0) {
                            connection.query("UPDATE products SET stock_quantity='"+ (res[id].stock_quantity - answer.quant) + "' WHERE item_id='"+product+"'", function(err,res2) {
                                console.log('Product Bought!');
                                makeTable();
                            })
                        } else {
                            console.log('Insufficient quantity!');
                            promptCustomer(res);
                        }
                    })
            }
        }
    if(i == res.length && correct == false) {
        console.log('Not a valid selection!');
        promptCustomer(res);
    }
    })
}



