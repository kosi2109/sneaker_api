const express = require("express")
const router = express.Router()
const {signup,login,getUser} = require("../controllers/user")



router.post('/signup',signup)
router.post('/login',login)
router.get('/:id',getUser)

module.exports = router