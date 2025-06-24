const express = require("express");
const signup = require("../controller/signupController");
const login = require("../controller/loginController");
const { authenticateToken } = require("../middleware/auth");
const logout = require("../controller/logoutController");
const {
  addJob,
  editJob,
  listJob,
  applyJob,
  unapply,
  applied,
} = require("../controller/jobController");

const router = express.Router();

const userProfile = require("../controller/userController");

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/jobs", authenticateToken, addJob);

router.put("/jobs/:id", authenticateToken, editJob);

router.get("/jobs", authenticateToken, listJob);

router.post("/jobs/:id/apply", authenticateToken, applyJob);

router.get("/unapply", authenticateToken, unapply);

router.get("/applied", authenticateToken, applied);

router.get("/user/profile", authenticateToken, userProfile);

module.exports = router;
