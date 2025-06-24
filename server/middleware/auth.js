const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; //attach user to request
    next(); //proceed to next middleware
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
};

const verifyAdmin = async (req, res, next) => {
  //user
  if (req.user.role !== "jobseeker") return res.sendStatus(403);

  //recruiter
  if (req.user.role !== "recruiter") return res.sendStatus(403);

  next();
};

module.exports = { authenticateToken, requireRole, verifyAdmin };
