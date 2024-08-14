const express = require('express')

const connection = require('../Config/db')


exports.getchats = async (req, res) => {
    const user_id = req.params.id;

    if (user_id) {
        connection.query(`
            SELECT 
                chat.*,
                nursery.*,
                latest_message.message,
                latest_message.date_time
            FROM 
                chat
            INNER JOIN 
                nursery ON chat.receiver_id = nursery.seller_id
            LEFT JOIN 
                (
                    SELECT 
                        messages1.chatid, 
                        messages1.message, 
                        messages1.date_time
                    FROM 
                        messages messages1
                    LEFT JOIN 
                        messages messages2
                    ON 
                        (messages1.chatid = messages2.chatid AND messages1.date_time < messages2.date_time)
                    WHERE 
                        messages2.date_time IS NULL
                ) AS latest_message ON chat.chatid = latest_message.chatid
            WHERE 
                chat.sender_id = ?
            ORDER BY 
                latest_message.date_time DESC
        `, [user_id], (selectErr, rows) => {
            if (!selectErr) {
                if (rows.length > 0) {
                    res.json({
                        data: rows
                    });
                } else {
                    res.json({
                        message: 'No chats found for the specified user.'
                    });
                }
            } else {
                console.error('Error fetching chats:', selectErr);
                res.status(500).json({ error: 'An error occurred while fetching chats.' });
            }
        });
    } else {
        res.status(400).json({ error: 'User ID parameter is missing.' });
    }
};


exports.getchatsbusiness = async (req, res) => {
    const user_id = req.params.id; 
    
    if (user_id) {
        connection.query(`
            SELECT 
                chat.*,
                sender.*,
                receiver.*,
                latest_message.message,
                latest_message.date_time
            FROM 
                chat
            INNER JOIN 
                users AS sender ON chat.sender_id = sender.id
            INNER JOIN 
                nursery AS receiver ON chat.receiver_id = receiver.seller_id
            LEFT JOIN 
                (
                    SELECT 
                        messages1.chatid, 
                        messages1.message, 
                        messages1.date_time
                    FROM 
                        messages messages1
                    LEFT JOIN 
                        messages messages2
                    ON 
                        (messages1.chatid = messages2.chatid AND messages1.date_time < messages2.date_time)
                    WHERE 
                        messages2.date_time IS NULL
                ) AS latest_message ON chat.chatid = latest_message.chatid
            WHERE 
                chat.receiver_id = ?
            ORDER BY 
                latest_message.date_time DESC
        `, [user_id], (selectErr, rows) => {
            if (!selectErr) {
                if (rows.length > 0) { 
                    res.json({
                        data: rows
                    });
                } else {
                    res.json({
                        message: 'No chats found for the specified user.'
                    });
                }
            } else {
                console.error('Error fetching chats:', selectErr);
                res.status(500).json({ error: 'An error occurred while fetching chats.' });
            }
        });
    } else {
        res.status(400).json({ error: 'User ID parameter is missing.' });
    }
};


exports.getmessagesuser =async (req ,res) =>{
    const chatId = req.params.chatid;

    // Execute the SQL query
    connection.query('SELECT * FROM messages INNER JOIN chat ON chat.chatid = messages.chatid WHERE messages.chatid = ?', [chatId], (error, messages, fields) => {
      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }
      res.json({
        data: messages,
    });
    });
    
}

exports.createMessage = async (req, res) => {
    const { selectedChat, text,user_id } = req.body; 
   
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

    if(selectedChat && text){
    connection.query('INSERT INTO messages (chatid, message, date_time,sendermessage) VALUES (?, ?, ?,?)', [selectedChat, text ,formattedDate,user_id], (error, result) => {
        if (error) {
            console.error('Error creating message:', error);
            res.status(500).json({ error: 'An error occurred while creating the message.' });
            return;
        }
        // Assuming you want to send back the ID of the newly created message
        res.json({
            message: 'Message created successfully',
            messageId: result.insertId
        });
    });
        }
};


exports.savechat = async (req, res) => {

    const user_id = req.body.user_id;
    const nurseryid = req.body.nurseryid;
    if (user_id && nurseryid) {

        connection.query(`SELECT * FROM chat WHERE sender_id = ${user_id} AND receiver_id = ${nurseryid}`, (selectErr, selectRows) => {
            if (!selectErr) {
                if (selectRows.length > 0) {
                    
                  
                    res.json({
                        status: false,
                        message: 'Data already exists.',
                        chatid: selectRows[0].chatid,
                    });
                } else {
                    // Data doesn't exist, perform the insert
                    connection.query(`INSERT INTO chat (sender_id, receiver_id) VALUES (${user_id}, ${nurseryid})`, (insertErr, insertRows, insertFields) => {
                        if (!insertErr) {
                            const insertedId = insertRows.insertId; // Get the inserted ID
                          
                            res.json({
                                status: true,
                                chatid: insertedId, // Include the inserted ID in the response
                               
                            });
                        } else {
                            console.log(insertErr);
                            res.status(500).json({ error: 'An error occurred while inserting into the chat table.' });
                        }
                    });
                }
            } else {
                console.log(selectErr);
                res.status(500).json({ error: 'An error occurred while checking for existing data.' });
            }
        });

    }
};

