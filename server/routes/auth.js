const express = require("express");
const signup = require("../controller/signupController");
const login = require("../controller/loginController");

const logout = require("../controller/logoutController");

const router = express.Router();

router.post("/signup", signup);

router.get("/login", login);

router.post("/logout", logout);

module.exports = router;
