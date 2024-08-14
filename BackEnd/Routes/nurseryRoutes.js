const express = require('express')
const router = express.Router()
const multer = require('multer');
const connection = require('../Config/db')

const { getNurserybyId, getAllNursery, addNewNursery, deleteNurseryById } = require('../Controllers/nurseryController')

//Get Request All and By ID
// router.route('/get/Users').get(getUsers)

router.route('/get/nursery/:id').get(getNurserybyId)
router.route('/get/nurseries').get(getAllNursery)


// Configure storage for multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/post/nursery', upload.array('images', 5), (req, res) => {
    try {
    
        let seller_id = req.body.seller_id;
        let business_name = req.body.business_name;
        let address = req.body.address;
        let description = req.body.description;
        let images = req.files.map(file => file.filename).join(', ');
        
        // Check for missing data before running any queries
        if (!seller_id || !business_name || !address || !description || !images) {
            return res.json({
                status :false ,
                message: "Some data is missing",
            });
        }
        
        // Use placeholders to prevent SQL injection
        connection.query('SELECT * FROM `nursery` WHERE seller_id = ?', [seller_id], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    status: false,
                    message: "Internal Server Error",
                });
            }
        // Value to be inserted 
            if (rows.length > 0) {
                // Seller exists, perform update
                const updateQuery = 'UPDATE nursery SET business_name = ?, business_location = ?, description = ?, gallery = ? WHERE seller_id = ?;';
                connection.query(updateQuery, [business_name, address, description, images, seller_id], (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            status: false,
                            message: "Internal Server Error",
                        });
                    }
                    res.json({
                        status: true,
                        message: "Data updated in the Plants table",
                    });
                });
            } else {
                // Insert new record
                const query = 'INSERT INTO `nursery`( `seller_id`, `business_name`, `business_location`, `description`, `gallery`) VALUES (?,?,?,?,?);';
                connection.query(query, [seller_id, business_name, address, description, images], (err, rows) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            status: false,
                            message: "Internal Server Error",
                        });
                    }
                    res.json({
                        status: true,
                        message: "Data inserted into the Plants table",
                    });
                });
            }
        });
        


    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
})



router.route('/delete/by/:id').delete(deleteNurseryById)

module.exports = router;