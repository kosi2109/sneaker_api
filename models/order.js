const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');

const orderSchema = mongoose.Schema({
    order_id : {
        type: String,
        default : uuidv4()
    },
    userId:{
        type: String
    },
    name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    order_date : {
        type : Date,
        default : Date.now()
    },
    status :{
        type : String,
        default : "pending"
    },
    order_items : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "OrderItem",
        default : []
    }
})


const orderItemsSchema = mongoose.Schema({
    item :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true
    },
    quantity :{
        type : Number,
        required : true
    },
    option : {
        size : {
            type : String,
            required : true
        },
        color : {
            type : String,
            required : true
        }
    }
})

const Order = mongoose.model("Order",orderSchema)

const OrderItem = mongoose.model("OrderItem",orderItemsSchema)

module.exports = {Order,OrderItem}



