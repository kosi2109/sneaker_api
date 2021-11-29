const express = require("express")
const router = express.Router()
const {getProducts , newProduct ,getProductsByBrand ,getFeatureProducts} = require("../controllers/product")
const {auth} = require("../helper/auth")

router.get('/',getProducts)
router.post('/',auth,newProduct)
router.get('/b/:brand',getProductsByBrand)
router.get('/feature-products',getFeatureProducts)


module.exports = router








