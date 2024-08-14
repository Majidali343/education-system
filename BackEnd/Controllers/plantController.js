const express = require('express')


const connection = require('../Config/db')




// Get Nursery by Id

exports.getNewArivals = async (req, res) => {
    console.log(req.params.id)


    connection.query('SELECT * FROM plant ', (err, rows, fields) => {
        if (!err) {
            res.json({
                rows
            })
        }

        else
            console.log(err);
    })
}

exports.getPlantbyId = async (req, res) => {
    console.log(req.params.id)


    connection.query('SELECT * FROM plant WHERE seller_id = ' + req.params.id, (err, rows, fields) => {
        if (!err) {
            res.json({
                rows
            })
        }

        else
            console.log(err);
    })
}

exports.getPantToEdit = async (req, res) => {
    console.log(req.params.id)


    connection.query('SELECT * FROM plant WHERE id = ' + req.params.id, (err, rows, fields) => {
        if (!err) {
            res.json({
                rows
            })
        }

        else
            console.log(err);
    })
}




exports.getsearchedproducts = async (req, res) => {

    try {
        const searchTerm = req.params.data;
    
        const query = `SELECT * FROM plant WHERE name LIKE ? OR category LIKE ?`;
        connection.query(query, [`%${searchTerm}%`, `%${searchTerm}%`], (err, rows, fields) => {
            if (!err) {
                res.json({
                    rows
                });
            } else {
                console.error(err);
                res.status(500).json({
                    error: 'Internal Server Error',
                    status: 'failure',
                });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error',
            status: 'failure',
        });
    }
    
};


//  Get All Nursey
exports.getAllPlants = async (req, res) => {

    connection.query('SELECT * FROM `plant`LIMIT 16 ', (err, rows, fields) => {
        if (!err) {
            res.json({
                rows
            })
        }

        else
            console.log(err);
    })
}

exports.getPlantsbyCategory = async (req, res) => {
    console.log(req.params.id);
    var category

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
        const query1 = 'SELECT * FROM `plant` WHERE id = ?';
        const results1 = await queryAsync(query1, [req.params.id]);
        category = results1[0].category

        const query2 = 'SELECT * FROM `plant` WHERE category = ?';
        const rows = await queryAsync(query2, [category]);

        res.json({
            rows
        })

    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    }


};

exports.PlantsbyCategory = async (req, res) => {
    try {
        const query = 'SELECT * FROM plant WHERE category = ?';
        connection.query(query, [req.params.category], (err, rows, fields) => {
            if (!err) {
                res.json({
                    rows
                });
            } else {
                console.error(err);
                res.status(500).json({
                    error: 'Internal Server Error',
                    status: 'failure',
                });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error',
            status: 'failure',
        });
    }
};



//Delete Api 

exports.deletePlantById = async (req, res) => {
    // console.log(req.params.id)


    connection.query('DELETE FROM plant WHERE id = ' + req.params.id, (err, rows, fields) => {
        if (!err) {
            res.json({
                status: true,
                Message: "The data is delete in Plants table using by id"
            })
        }

        else
            console.log(err);
    })
}










