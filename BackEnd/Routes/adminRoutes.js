const express= require('express')
const router = express.Router()

const {login ,getAllUsers} =require('../Controllers/adminController') ;

//Get Request All and By ID
// router.route('/get/Users').get(getUsers)

router.route('/get/users').get(getAllUsers)

router.route('/login').post(login)

module.exports= router;