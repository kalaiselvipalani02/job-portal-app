const logout = async (req, res) => {
  //res.clearCookie("connect.sid"); // default session cookie name
  res.clearCookie("token"); // if you set a JWT cookie
  res.json({ message: "Logged out successfully" });
};
module.exports = logout;
