const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();
const userProfile = require("../controller/userController");

router.get("/user/profile", authenticateToken, userProfile);

module.exports = router;
