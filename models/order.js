const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');

const orderSchema = mongoose.Schema({
    order_id : {
        type: String,
        default : uuidv4()
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
        type : String
    }
})


const Order = mongoose.model("Order",orderSchema)

module.exports = Order



