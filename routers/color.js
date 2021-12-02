const express = require("express")
const router = express.Router()
const {getColor} = require("../controllers/color")


router.get('/',getColor)
// router.post('/',createColor)





module.exports = router
