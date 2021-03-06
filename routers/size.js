const express = require("express");
const router = express.Router();
const { getSizes } = require("../controllers/size");

router.get("/", getSizes);

module.exports = router;
