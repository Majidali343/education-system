const express = require('express')
const router = express.Router()


const { paymenthistory ,Testapi
    , getpaymentsbyId, Makepayment, saveorder, refundPayment
    , SellerPaymentMethod, savebank } = require('../Controllers/paymentsController')

//Get Request All and By ID
// router.route('/get/Users').get(getUsers)


router.route('/savemethod/:session_id/:id').get(savebank)
router.route('/saveorder/:session_id/:id').get(saveorder)
router.route('/refund').post(refundPayment)
router.route('/SellerPaymentMethod/:id').post(SellerPaymentMethod)
router.route('/Makepayment/:id').post(Makepayment)
router.route('/test').get(Testapi)
router.route('/get').get(paymenthistory)
router.route('/get/:id').get(getpaymentsbyId)

module.exports = router;