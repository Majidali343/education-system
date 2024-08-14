const express = require('express')

const connection =require('../Config/db')
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.getAllUsers=async(req,res)=>{

    
    connection.query('SELECT * FROM `users`', (err, rows, fields) => {
        if (!err){
        // const row =res.json.rows;
        // console.log(rows)
        res.json({
                rows,
                Message:"This is nursery"
                
               })

        }
    
        else
        console.log(err);
        })

}




// exports.userProfile=async(req,res)=>{
    //    res.json({
    //     Message:"This is User Profile"
    //    })
// }



exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    
    if (!email || !password) {
      return res.status(400).json({ status: false, message: 'Please provide both email and password.' });
    }
  
    try {
      const query = 'SELECT * FROM admin WHERE email = ?';
      connection.query(query, [email], async (error, results, fields) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ status: false, message: 'Internal server error.' });
        }
  
        if (results.length > 0) {
          const match = await bcrypt.compare(password, results[0].password);
        
          if (match) {
            return res.json({
              status: true,
              message: 'Welcome. You are successfully logged in.',
              
              admin_id: results[0].id,
            //   user_type: results[0].user_type,
            //   user_name: results[0].First_name + ' ' + results[0].last_name,
            });
          } else {
            return res.status(400).json({ status: false, message: 'Incorrect password.' });
          }
        } else {
          return res.status(404).json({ status: false, message: 'User not found.' });
        }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: 'Internal server error.' });
    }
  };
  

