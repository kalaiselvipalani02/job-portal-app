const bcrypt = require("bcrypt");
const User = require("../models/User");

signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    //create user .. password ecnrypt in models
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal InternalServer Error" });
  }
};

module.exports = signup;
