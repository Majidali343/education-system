const express= require('express')
const router = express.Router()

const{ AddProductToCart  ,CartItems, UpdateStock ,DowngradeStock,deletecartById,cartTotal}=require('../Controllers/CartController')

router.route('/AddToCart').post(AddProductToCart)
router.route('/CartItems/:id').get(CartItems)
router.route('/updateStock').post(UpdateStock)
router.route('/Downgrade').post(DowngradeStock)
router.route('/deletecartitem/:id').delete(deletecartById)
router.route('/carttotal/:id').get(cartTotal)


module.exports= router;