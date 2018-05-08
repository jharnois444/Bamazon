const mysql = require('mysql'),
      inquirer = require('inquirer'),
      table = require('cli-table'),

     connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'bamazon_db'
      });

      connection.connect((err) => {
        if (err) throw err;
        // console.log('Connected!');
        itemIdToBuy();
      });


// Ask customer the ID of the product they would like to buy.
var itemIdToBuy = function() {
    connection.query('SELECT * FROM products', function(err, res) {
        // Create a new table
        var table = new table({
            head: ['ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
        });

        // Displays items for sale
        console.log('Current items available: ');
        console.log('-------------------------');
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price.toFixed(2), res[i].stock_quantity]);
        }
        console.log('-------------------------');
        // Logs table with items for purchase
        console.log(table.toString());
        inquirer.prompt([{
            name: 'item_id',
            type: 'input',
            message: 'Which item ID would you like to buy?',
            validate: function(value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            }
        },
// Ask customer how many units of the product they would like to buy.
        {
            name: 'Quantity',
            type: 'input',
            message: 'How many would you like to buy?',
            validate: function(value) {
                if (isNaN(value) == false) {
                    return true;
                } else{
                    return false;
                }
            }
        }]).then(function(answer) {
            var chosenId = answer.item_id - 1
            var chosenProduct = res[chosenId]
            var chosenQuantity = answer.chosenQuantity
            if (chosenQuantity < res[chosenId].stock_quantity) {
                console.log('Your total for ' + '(' + answer.Quantity + ')' + '-' + res[chosenId].product_name + ' is: ' + res[chosenId].price.toFixed(2) * chosenQuantity);
                connection.query('UPDATE products SET ? WHERE ?', [{
                    stock_quantity: res[chosenId].stock_quantity - chosenQuantity
                }, {
                    id:res[chosenId].item_id
                }], function(err, res) {
                    itemIdToBuy();
                });
            } else {
                console.log('Sorry, quantity of this item is insufficient at this time. You have requested ' + chosenQuantity + ', but there are only ' + res[chosenId].stock_quantity + ' in our inventory');
                itemIdToBuy();
            }
        })
    })
}

itemIdToBuy();