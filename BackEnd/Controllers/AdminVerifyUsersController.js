const express = require('express')

const connection =require('../Config/db')

exports.GetVerifcaionDetils=async(req,res)=>{

    
    connection.query('SELECT * FROM `verification_documents` INNER JOIN `users` ON  verification_documents.user_id=users.id ' , (err, rows, fields) => {
        if (!err){
        // const row =res.json.rows;
        // console.log(rows)
        res.json({
                rows,
                Message:"The uploaded proves"
                
               })

        }
    
        else
        console.log(err);
        })

}

exports.updateUserStatus = async (req, res) => {

    const userId = req.params.id;
    const newStatus = req.body.status;

    console.log(req.body)
    
    if (!userId || !newStatus) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const updateQuery = 'UPDATE `users` SET user_status = ? WHERE id = ?';

    connection.query(updateQuery, [newStatus, userId], (updateErr, updateResults) => {

        if (updateErr) {
            console.error('Error updating status:', updateErr);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (updateResults.affectedRows === 0) {
            // No rows were affected, meaning the product with the given ID was not found
            return res.status(404).json({ error: 'User not found' });
        }
        // Successful update
        res.json({ message: 'Status updated successfully' });
    });


}


