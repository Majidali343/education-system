const express = require('express')

const connection = require('../Config/db')




// Get Nursery by Id

exports.getNurserybyId = async (req, res) => {
    const sellerId = req.params.id;
  
    // Use a parameterized query to prevent SQL injection
    connection.query(
      'SELECT nursery.*, users.* FROM nursery JOIN users ON nursery.seller_id = users.id WHERE nursery.seller_id = ?',
      [sellerId],
      (err, rows, fields) => {
        if (!err) {
          res.json({
            rows,
            status: true,
            message: 'Get Nursery by id with User information',
          });
        } else {
          console.log(err);
          // It's a good practice to send a response in case of error as well
          res.status(500).json({
            status: false,
            message: 'Internal Server Error',
          });
        }
      }
    );
  };
  


//  Get All Nursey
exports.getAllNursery = async (req, res) => {


    connection.query('SELECT * FROM `nursery`', (err, rows, fields) => {
        if (!err) {
            res.json({
                rows,
                Message: "This is nursery"
            })
        }

        else
            console.log(err);
    })
}



// Add New Nursery



//Delete Api 

exports.deleteNurseryById = async (req, res) => {
    // console.log(req.params.id)


    connection.query('DELETE FROM nursery WHERE id = ' + req.params.id, (err, rows, fields) => {
        if (!err) {
            res.json({
                status: true,
                Message: "The data is delete in Nursery table using by id"
            })
        }

        else
            console.log(err);
    })
}










