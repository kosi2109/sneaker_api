const express = require("express")
const router = express.Router()
const {getBrands} = require("../controllers/brand")


router.get('/',getBrands)
// router.post('/',createBrand)





module.exports = router













