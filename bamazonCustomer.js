const mysql = require('mysql'),
      inquirer = require('inquirer'),
      Table = require('cli-table'),

     connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'bamazon_db'
      });

      connection.connect((err) => {
        if (err) throw err;
        console.log('Connected!');
        displayProducts();
      });




//connect to the mysql database and pull the information from the Products database to display to the user
function displayProducts() {
	
	var sql = 'SELECT item_id, product_name, price, stock_quantity FROM products'

	connection.query(sql, function(err, result){

		if(err) console.log(err)

		//creates a table for the information from the mysql database to be placed
		console.log('>>>>>>Products Available for Purchase<<<<<<')
		var table = new Table({
			head: ['Item Id#', 'Product Name', 'Price', 'stock_quantity'],
			//chars: chars,
			colAligns: [null, null, 'right'],
			style: {
				head: ['blue'],
				compact: false
			}
		})

		//loops through each item in the mysql database and pushes that information into a new row in the table
		
		for(var i = 0; i < result.length; i++){
			table.push([result[i].item_id, result[i].product_name, result[i].price, result[i].stock_quantity])
		}
		//show the product info in tabular form

		console.log(table.toString())
		
		//determine what customer wants to do
		
		itemIdToBuy(result)
	})
}



// Ask customer the ID of the product they would like to buy.
 itemIdToBuy = function(result) {
    inquirer
    .prompt({
      name: "userItem",
      type: "input",
      message: "Which item would you like to purchase?"
    })
    .then(function(answer) {
        for(i=0; i<result.length; I++){
            if (result[i].item == answer.userItem)
            console.log(error)
        }
      // based on their answer, either call the bid or the post functions
      if (answer.userItem <= 10) {
        postAuction();
      }
      else {
        bidAuction();
      }
    });




// // Ask customer how many units of the product they would like to buy.
//         {
//             name: 'Quantity',
//             type: 'input',
//             message: 'How many would you like to buy?',
//             validate: function(value) {
//                 if (isNaN(value) == false) {
//                     return true;
//                 } else{
//                     return false;
//                 }
//             }
//         }]).then(function(answer) {
//             var chosenId = answer.item_id - 1
//             var chosenProduct = res[chosenId]
//             var chosenQuantity = answer.chosenQuantity
//             if (chosenQuantity < res[chosenId].stock_quantity) {
//                 console.log('Your total for ' + '(' + answer.Quantity + ')' + '-' + res[chosenId].product_name + ' is: ' + res[chosenId].price.toFixed(2) * chosenQuantity);
//                 connection.query('UPDATE products SET ? WHERE ?', [{
//                     stock_quantity: res[chosenId].stock_quantity - chosenQuantity
//                 }, {
//                     id:res[chosenId].item_id
//                 }], function(err, res) {
//                     itemIdToBuy();
//                 });
//             } else {
//                 console.log('Sorry, quantity of this item is insufficient at this time. You have requested ' + chosenQuantity + ', but there are only ' + res[chosenId].stock_quantity + ' in our inventory');
//                 itemIdToBuy();
//             }
//         })
//     })
// }

// itemIdToBuy();