const express = require("express");
const router = express.Router();
const { signup, login, getUser, logout } = require("../controllers/user");

router.post("/signup", signup);
router.post("/logout", logout);
router.post("/login", login);
router.get("/:id", getUser);

module.exports = router;
