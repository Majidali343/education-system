const express= require('express')
const router = express.Router()

const {GetVerifcaionDetils ,updateUserStatus} = require('../Controllers/AdminVerifyUsersController')


router.route('/changeStatus/:id').put(updateUserStatus);
router.route('/get').get(GetVerifcaionDetils);

module.exports= router;