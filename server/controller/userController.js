const User = require("../models/User");
const jwt = require("jsonwebtoken");

const userProfile = async (req, res) => {
  console.log("UserProfile");
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = userProfile;
