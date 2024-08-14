const express = require('express')
const router = express.Router()
const connection = require('../Config/db')

router.get('/admindashboard', async (req, res) => {
    var orders;
    var total_amount;
    var returns;
    var notifications;

    const queryAsync = (sql) => {
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    };

    try {
        // Fetch data from the first table
        const query1 = 'SELECT COUNT(order_items.items_id) AS order_count , SUM(plant.price * order_items.quantity) AS total_order_amount  FROM orders INNER JOIN order_items ON orders.id = order_items.order_id INNER JOIN plant ON order_items.product_id = plant.id INNER JOIN users ON plant.seller_id = users.id WHERE  order_items.status NOT IN ("return" ,"Cancelled") ';
        const results1 = await queryAsync(query1);
        
        const orders = results1[0].order_count;
        const total_amount = results1[0].total_order_amount;

        // Fetch data from the second table
        // Fetch data from the second table
        const query2 = 'SELECT COUNT(*) AS return_count FROM `return/cancels`';
        const results2 = await queryAsync(query2);
        const returns = results2[0].return_count;

        // Fetch data from the third table
        const query3 = 'SELECT COUNT(*) AS notification_count FROM users ';
        const results3 = await queryAsync(query3);
        const users = results3[0].notification_count;

        // Send the response with all the data
        res.json({ orders, total_amount, returns, users });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/dashboardDetails/:id', async (req, res) => {
    var orders;
    var total_amount;
    var returns;
    var notifications;

    const queryAsync = (sql, values) => {
        return new Promise((resolve, reject) => {
            connection.query(sql, values, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    };

    try {
        // Fetch data from the first table
        const query1 = 'SELECT COUNT(order_items.items_id) AS order_count , SUM(plant.price * order_items.quantity) AS total_order_amount  FROM orders INNER JOIN order_items ON orders.id = order_items.order_id INNER JOIN plant ON order_items.product_id = plant.id INNER JOIN users ON plant.seller_id = users.id WHERE users.id = ? AND  order_items.status NOT IN ("return" ,"Cancelled") ';
        const results1 = await queryAsync(query1, [req.params.id]);
        
        const orders = results1[0].order_count;
        const total_amount = results1[0].total_order_amount;

        // Fetch data from the second table
        // Fetch data from the second table
        const query2 = 'SELECT COUNT(*) AS return_count FROM `return/cancels` WHERE seller_id = ?';
        const results2 = await queryAsync(query2, [req.params.id]);
        const returns = results2[0].return_count;

        // Fetch data from the third table
        const query3 = 'SELECT * from `users` WHERE id = ?';
        const results3 = await queryAsync(query3, [req.params.id]);
        const user = results3[0];

        // Send the response with all the data
        res.json({ orders, total_amount, returns, user });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;