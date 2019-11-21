# bamazon


Bamazon is an app used to meta items from a database.  It connects to a database with a products table that has the name, department name, price, and quantity.  When you run the bamazonCustomer.js file in node, it gives you the full selection of what's available, and asks which item you would like to purchase.

If their is a high enough quantity in stock for you to purchase, it subtracts the amount you want to buy from the stock quantity table.  If you ask for a higher amount than what is available, then it will stop the purchase, and tell you there isn't enough in stock.

I'm going to make a manager view, and and a supervisor view with more functionality when I have a chance to come back to this.