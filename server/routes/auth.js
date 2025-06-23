const express = require("express");

const signup = require("../controller/signupController");

const router = express.Router();

router.post("/signup", signup);

module.exports = router;
