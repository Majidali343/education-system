const express= require('express')
const router = express.Router()

const{ getOrderbyId,getAllOrder,addNewOrder, deleteOrderById,userorderstatics,getAllreturns,getOrderforadmin,getAllreturnsByid,updteOrderStatus, getOrderbyIdseller }=require('../Controllers/orderController')

//Get Request All and By ID
// router.route('/get/Users').get(getUsers)

router.route('/buyerstatics/:id').get(userorderstatics)
router.route('/sellerorders').get(getOrderforadmin)
router.route('/sellerorders/:id').get(getOrderbyIdseller)
router.route('/get/:id').get(getOrderbyId)
router.route('/get').get(getAllOrder)
router.route('/returns').get(getAllreturns)
router.route('/returns/:id').get(getAllreturnsByid)
router.route('/post').post(addNewOrder)
router.route('/delete/by/:id').delete(deleteOrderById)
router.route('/updateStatus/:id').put(updteOrderStatus)



module.exports= router;