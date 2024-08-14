const express = require('express')
const { emailverify } = require('../utils/EmailSender');
const { sendEmail } = require('../utils/EmailSender');
const connection = require('../Config/db')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const crypto = require("crypto")

const encrypt = (plainText, password) => {
  try {
    const iv = crypto.randomBytes(16);
    const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    let encrypted = cipher.update(plainText);
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return iv.toString('hex') + ':' + encrypted.toString('hex');

  } catch (error) {
    console.log(error);
  }
}

const decrypt = (encryptedText, password) => {
  try {
    const textParts = encryptedText.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');

    const encryptedData = Buffer.from(textParts.join(':'), 'hex');
    const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    
    const decrypted = decipher.update(encryptedData);
    const decryptedText = Buffer.concat([decrypted, decipher.final()]);
    return decryptedText.toString();
  } catch (error) {
    console.log(error)
  }
}


const pass = "secret1234"



// This is Register/Signup API

exports.signup = async (req, res) => {
  const bodypassword = req.body.password;
  const encryptedPassword = await bcrypt.hash(bodypassword, saltRounds)

  const signUpquery = 'INSERT INTO `users`( `First_name`, `last_name`, `email`, `password`, `user_type`, `city`,`phone`) VALUES (?,?,?,?,?,?,?);';
  // Value to be inserted 

  let id = req.body.id;
  let First_name = req.body.First_name;
  let last_name = req.body.last_name;
  let password = encryptedPassword;
  let email = req.body.email;
  let user_type = req.body.user_type;
  let city = req.body.city;
  let phone = req.body.phone;

  // Value to be inserted 

  // Creating queries 
  if (First_name && last_name && email && password && user_type && city && phone) {

    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], async (error, results, fields) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error.' });
      }

      if (results.length > 0) {
        return res.json({ status: false, message: 'Email already registered.' });
      } else {

        connection.query(signUpquery, [First_name, last_name, email, password, user_type, city, phone], (err, rows) => {
          if (!err) {

            try {

              emailverify(email);
              console.log("Email sent successfully!");
            } catch (error) {
              console.error("Failed to send email:", error);
            }

            return res.json({
              status: true,
              email: email,
              message: "Wellcome!!!.... please verify you email"
            })


          } else {
            console.log(err);

          }
        });

      }
    });


  } else {
    res.json({
      status: false,
      Message: "some data is missing"
    })
  }

}

exports.verifyotp = async (req, res) => {
  const { registeremail, otp } = req.body;
  if (!registeremail || !otp) {
    return res.status(200).json({ status: false, message: 'Please login again to verify email' });
  }
  try {
    const sql = 'SELECT otp FROM `users` WHERE email = ?';
    connection.query(sql, [registeremail], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: 'Internal Server Error' });
      }
      if (result.length === 0) {
        return res.status(200).json({ status: false, message: 'You are not registered' });
      }
      const userotp = result[0].otp;
      if (userotp != otp) {
        console.error(userotp, otp);
        return res.status(200).json({ status: false, message: 'wrong otp please try again' });
      }

      const updateSql = 'UPDATE `users` SET email_verified = 1 WHERE email = ?';
      connection.query(updateSql, [registeremail], (updateErr, updateResult) => {
        if (updateErr) {
          console.error(updateErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        return res.json({
          status: true,
          message: 'Your email is verified. You can now log in.'
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.isverified = async (req, res) => {

  const query = "SELECT * FROM users WHERE id = ?";
  connection.query(query, [req.params.id], async (error, result) => {
    if (!error) {
      res.send({
        status: true,
        data: result
      })
    }
  })
}

exports.forgotpassword = async (req, res) => {
  
  const query = "SELECT * FROM users WHERE email = ?";
  if (req.body.email) {
    connection.query(query, [req.body.email], async (error, result) => {
      if (error) {
        console.error("Error querying the database:", error);
        res.status(500).send({ error: "Internal server error" });
      } else {
        if (result.length > 0) {
          const stringtext = result[0].id.toString();

          const encText = encrypt(stringtext, pass)

          const subject = 'Change Password Rooftopcultivation';
          const text = `http://localhost:3000/forgot/${encText}`;
          await sendEmail(req.body.email, subject, text);

          res.status(200).send({
            status: true,
            message: "forgot password link is sended to you at mail",
            user: result[0]
          });
        } else {
          res.send({
            status: false,
            message: "Email not found"
          });
        }
      }
    });
  } else {
    res.status(400).send({ error: "Missing email parameter" });
  }
};

exports.changepassword = async (req, res) => {
  const query = "UPDATE users SET password = ? WHERE id = ?";

  // Check if the required parameters are provided
  if (req.body.password && req.body.userid) {
    const { password, userid } = req.body;
    const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds)
    const decText = decrypt(userid, pass)

    connection.query(query, [encryptedPassword, decText], async (error, result) => {
      if (error) {
        console.error("Error querying the database:", error);
        res.status(500).send({ error: "Internal server error" });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).send({
            status: true,
            message: "Password changed successfully"
          });
        } else {
          res.send({
            status: false,
            message: "User not found"
          });
        }
      }
    });
  } else {
    res.status(400).send({ error: "Missing parameters: password or userid" });
  }
};



exports.getaddress = async (req, res) => {
  const query = "SELECT delievery_address FROM users WHERE id = ?";
  if (req.params.id) {
    connection.query(query, [req.params.id], async (error, result) => {
      if (!error) {
        res.send({
          status: true,
          address: result
        })
      }
    })
  }
}

exports.saveaddress = async (req, res) => {
  const query = "UPDATE users SET delievery_address = ? WHERE id = ?";
  if (req.body.address && req.params.id) {
    connection.query(query, [req.body.address, req.params.id], async (error, result) => {
      if (!error) {
        res.send({
          status: true,
          data: result
        })
      }
    })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(200).json({ status: false, message: 'Please provide both email and password.' });
  }

  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error.' });
      }

      if (results.length > 0) {
        const match = await bcrypt.compare(password, results[0].password);
        if (match) {

          if (results[0].email_verified == 1) {
            req.session.user = results[0].id

            return res.json({
              status: true,
              message: 'Welcome. You are successfully logged in.',
              user_id: results[0].id,
              user_type: results[0].user_type,
              user_name: results[0].First_name + ' ' + results[0].last_name,
            });
          } else {

            try {
              emailverify(results[0].email);
              console.log("Email sent successfully!");
            } catch (error) {
              console.error("Failed to send email:", error);
            }

            return res.json({
              status: false,
              message: 'Please verify your email we send an otp to your email',
              email: results[0].email
            });
          }

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


exports.profileverify = async (req, res) => {
  const iddocument = req.files.idDocument[0].filename;
  const addresprove = req.files.addressProof[0].filename;
  const userid = req.body.user_id;

  if (!iddocument || !addresprove || !userid) {
    return res.status(400).json({
      status: false,
      message: "Any of File missing",
    });
  }

  const checkExistingRowQuery = `SELECT * FROM verification_documents WHERE user_id = ?`;

  // Check if a row with the provided user_id already exists
  connection.query(checkExistingRowQuery, [userid], (error, existingResults, fields) => {
    if (error) {
      console.error('Error checking existing row:', error);
      return res.status(500).json({
        status: false,
        message: "Internal server error",
      });
    }

    if (existingResults && existingResults.length > 0) {
      // If a row with the user_id already exists, update the existing row
      const updateQuery = `
        UPDATE verification_documents 
        SET id_documents = ?, address_prove = ? 
        WHERE user_id = ?
      `;

      connection.query(updateQuery, [iddocument, addresprove, userid], (updateError, updateResults) => {
        if (updateError) {
          console.error('Error updating data:', updateError);
          return res.status(500).json({
            status: false,
            message: "Internal server error",
          });
        }

        res.status(200).json({
          status: true,
          message: "Row updated",
        });
      });
    } else {
      // If no row with the user_id exists, insert a new row
      const insertQuery = `
        INSERT INTO verification_documents (user_id, id_documents, address_prove) 
        VALUES (?, ?, ?)
      `;

      connection.query(insertQuery, [userid, iddocument, addresprove], (insertError, insertResults) => {
        if (insertError) {
          console.error('Error inserting data:', insertError);
          return res.status(500).json({
            status: false,
            message: "Internal server error",
          });
        }

        res.status(200).json({
          status: true,
          message: "New row inserted",
        });
      });
    }
  });



};