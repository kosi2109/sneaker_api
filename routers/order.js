const express = require("express")
const router = express.Router()
const {userOrder,createOrder,userOrders} = require("../controllers/order")
const {auth} = require("../helper/auth")

router.get('/:id',auth,userOrders)
router.get('/order/:orderId',auth,userOrder)
router.post('/',createOrder)





module.exports = router