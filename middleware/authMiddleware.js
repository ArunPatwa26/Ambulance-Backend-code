const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ error: "Not authorized, invalid token" });
    }
  } else {
    res.status(401).json({ error: "Not authorized, no token provided" });
  }
};
