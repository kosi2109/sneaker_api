const express = require("express")
const router = express.Router()
const {userOrder,createOrder,userOrders} = require("../controllers/order")


router.get('/:id',userOrders)
router.get('/:userId/:orderId',userOrder)
router.post('/',createOrder)





module.exports = router