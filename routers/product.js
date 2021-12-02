const express = require("express")
const router = express.Router()
const {getProducts ,getProductsByBrand ,getFeatureProducts} = require("../controllers/product")


router.get('/',getProducts)
router.get('/b/:brand',getProductsByBrand)
router.get('/feature-products',getFeatureProducts)


module.exports = router








