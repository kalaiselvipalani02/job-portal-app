const User = require("../models/User");
const jwt = require("jsonwebtoken");

const logout = async (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid"); // default session cookie name
    res.clearCookie("token"); // if you set a JWT cookie
    res.json({ message: "Logged out successfully" });
  });
};
modules.export = logout;
