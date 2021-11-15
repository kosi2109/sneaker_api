const Order = require("../models/order")


const getOrders = async (req,res)=>{
    const orders = await Order.find()
    res.json(orders)
}

const createOrder = async (req,res)=>{

    const data = {
        order_id: req.body.order_id,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        status: req.body.status,
        order_items: req.body.order_items,
    }

    console.log(JSON.parse(data.order_items))
    try {
        const newOrder = new Order(data)
        await newOrder.save()
        res.json(newOrder)
    } catch (error) {
        res.json(error.message)
    }
}



module.exports = {getOrders,createOrder}






