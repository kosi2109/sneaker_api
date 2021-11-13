const mongoose = require("mongoose")

const brandSchema = mongoose.Schema({
    brand:{
        type : String,
        required: true
    },
    icon:{
        type : String,
        required : true
    }
})




const Brand = mongoose.model("Brand",brandSchema)


module.exports = Brand

