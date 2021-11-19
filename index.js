require('dotenv/config')
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const jwtAuth = require("./helper/jwt")
const app = express()
const errorHandaler = require("./helper/error-handaler")

// middleware
app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(jwtAuth())
app.use(errorHandaler)

// input from env
const DATABASE = process.env.DATABASE
const BASEURL = process.env.BASEURL
const apiUrl = '/api/v1/'

// routes
const BrandRoute = require("./routers/brand")
const ProductRoute = require("./routers/product")
const ColorRoute = require("./routers/color")
const SizeRoute = require("./routers/size")
const OrderRoute = require("./routers/order")
const UserRoute = require("./routers/user")


app.get('/',(req,res)=>{
    res.send("welcome")
})

app.use(`${apiUrl}brands`,BrandRoute)
app.use(`${apiUrl}products`,ProductRoute)
app.use(`${apiUrl}colors`,ColorRoute)
app.use(`${apiUrl}sizes`,SizeRoute)
app.use(`${apiUrl}orders`,OrderRoute)
app.use(`${apiUrl}users`,UserRoute)

mongoose.connect(DATABASE,()=>{
    app.listen(BASEURL,()=>{
        console.log(`Server listen on localhost:${BASEURL}`)
    })
})
