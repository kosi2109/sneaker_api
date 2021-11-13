const express = require("express")
const router = express.Router()
const {createSize,getSizes} = require("../controllers/size")


router.get('/',getSizes)
router.post('/',createSize )





module.exports = router