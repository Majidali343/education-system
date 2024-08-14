const schedule = require('node-schedule');
const connection = require('../Config/db')

const job = schedule.scheduleJob('0 */12 * * *', function () {
  async function transferPayment(paymentId, amount) {

    const percentage = 0.05; // 5 percent
    const transferAmount = amount * (1 - percentage); // Calculate the transfer amount

    console.log('Transfer Amount:', transferAmount);
    console.log('Payment ID:', paymentId);

    try {
      const transfer = await stripe.transfers.create({
        amount: transferAmount * 100, // Amount in cents
        currency: 'pkr', // Change to the appropriate currency
        destination: paymentId, // Seller's connected Stripe account ID
      });

      return transfer;
    } catch (error) {
      console.error('Transfer error:', error);
      throw error;
    }

  }



  connection.query('SELECT * FROM orders \
INNER JOIN order_items ON orders.id = order_items.order_id \
INNER JOIN plant ON plant.id = order_items.product_id \
INNER JOIN users ON plant.seller_id = users.id WHERE order_items.status NOT IN ("return", "Cancelled")'
    , (err, rows, fields) => {
      if (!err) {
        // Filter orders placed 7 days ago and whose payment status is still pending
        console.log(rows)
        const currentDate = new Date();
        const sevenDaysAgo = new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000)); // Calculate 7 days ago
        const eligibleOrders = rows.filter(order => new Date(order.change_date) <= sevenDaysAgo && order.status === 'Delievered');
        console.log(eligibleOrders, "eligibale orders")


        eligibleOrders.forEach(order => {

          // Assuming 'connection' is a valid connection to the database
          connection.query('SELECT * FROM `bankaccounts` WHERE seller_id = ?', order.seller_id, (queryErr, results) => {
            if (queryErr) {
              res.status(500).json({ error: 'Database error' }); // Sending a 500 Internal Server Error response
            } else {
              if (results.length > 0) {

                const paymentId = results[0].payment_id;
                const amount = order.price;

                // transferPayment(paymentId, amount)
                // .then(refund => {
                //     console.log('Payment transfer successful:', refund);

                // })
                // .catch(error => {
                //     res.status(500).json({ success: false, error: error.message });
                // });

                // query for update order status

                connection.query('UPDATE order_items SET status = ? WHERE items_id = ?', ['completed', order.items_id], (updateErr, updateResult) => {
                  if (updateErr) {
                    console.error(`Error updating payment status for order ${order.items_id}:`, updateErr);
                  } else {
                    console.log(`Payment status updated for order ${order.items_id}`);
                  }
                });

                /////query for transation 
                const currentDate = new Date();
                const insertQuery = `INSERT INTO payments_history (payment_date, payment_method, order_id, payment_amount ,seller_id )
                     VALUES (?, ?, ?, ? ,?)`;
                const values = [currentDate, 'Bank Transfer', order.items_id, order.price ,order.seller_id];

                // Execute the query
                connection.query(insertQuery, values, (error, results, fields) => {
                  if (error) {
                    console.error('Error occurred:', error);
                    throw error;
                  }
                  console.log('Insert successful!');
                });


              } else {

                console.log("payment method is no added")
              }
            }
          });


        });

        res.json({
          status: true,
          Message: "Funds transferred successfully"
        });
      } else {
        console.error(err);
        res.json({
          status: false,
          Message: "Error fetching orders"
        });
      }
    });


});