const express = require('express')

const connection = require('../Config/db')

exports.deletecartById = async (req, res) => {
  // console.log(req.params.id)


  connection.query('DELETE FROM cart WHERE id = ' + req.params.id, (err, rows, fields) => {
      if (!err) {
          res.json({
              status: true,
              Message: "Cart Item Deleted"
          })
      }

      else
          console.log(err);
  })
}


exports.AddProductToCart = async (req, res) => {
    const product_id = req.body.product_id;
    const buyer_id = req.body.user_id;
    const stock = req.body.stock;

    // First check if the product is already in the cart for this buyer
    const checkQuery = 'SELECT * FROM `cart` WHERE `product_id` = ? AND `buyer_id` = ?';

    connection.query(checkQuery, [product_id, buyer_id], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error checking cart");
        }

        // If the product is already in the cart, send a response
        if (rows.length > 0) {
            return res.json({
                status: true,
                message: "Product already in cart"
            });
        } else {
            // If the product is not in the cart, insert it
            const insertQuery = 'INSERT INTO `cart`(`product_id`, `buyer_id`, `stock`) VALUES (?, ?, ?)';

            connection.query(insertQuery, [product_id, buyer_id, stock], (insertErr, insertRows) => {
                if (insertErr) {
                    console.error(insertErr);
                    return res.status(500).send("Error adding product to cart");
                }

                res.json({
                    status: true,
                    message: "Product added to cart"
                });
            });
        }
    });
};


exports.CartItems = async (req, res) => {

    connection.query('SELECT * from `plant` INNER JOIN `cart`  ON plant.id = cart.product_id  WHERE buyer_id = ?', [req.params.id],(err, rows) => {
        if (!err) {
            res.json({
                rows,
                status: true,
            })
        }
        else
            console.log(err);

    });
}

exports.cartTotal=async(req,res)=>{

  connection.query('SELECT cart.buyer_id, SUM(cart.stock * plant.price) AS total_amount FROM `plant` INNER JOIN `cart` ON plant.id = cart.product_id WHERE cart.buyer_id = ? GROUP BY cart.buyer_id', [req.params.id], (err, row) => {
    if (!err) {
        res.json({
            row,
            status: true,
        });
    } else {
        console.log(err);
    }
});


}


exports.UpdateStock = async (req, res) => {
    const { productId } = req.body;
   

    const updateQuery = `UPDATE cart SET stock = stock + 1 WHERE id = ${productId}`;

    connection.query(updateQuery, (err, result) => {
      if (err) {
        res.status(500).send('Internal Server Error');
      } else {
        res.json({ success: true, message: 'Stock updated successfully' });
      }
    });
  };

  exports.DowngradeStock = async (req, res) => {
    const { productId } = req.body;

    // Update the stock only if it is greater than 0
    const updateQuery = `UPDATE cart SET stock = stock - 1 WHERE id = ? AND stock > 1`;

    connection.query(updateQuery, [productId], (err, result) => {
      if (err) {
        res.status(500).send('Internal Server Error');
      } else {
        if (result.affectedRows === 0) {
          // No rows were updated, meaning the stock was already at or below zero
          res.json({ success: false, message: 'Stock is already at the minimum level' });
        } else {
          // Stock was successfully updated
          res.json({ success: true, message: 'Stock updated successfully' });
        }
      }
    });
  };
