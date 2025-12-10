const jwt = require("jsonwebtoken");
require("dotenv").config();

// === AUTHENTICATE ===
const authenticate = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token tidak ada" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // simpan user ke req
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token tidak valid" });
  }
};

// === AUTHORIZE ROLE ===
const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    // pastikan authenticate sudah running
    if (!req.user) {
      return res.status(401).json({ message: "Belum login" });
    }

    if (!allowedRoles.includes(req.user.role_id)) {
      return res.status(403).json({ message: "Tidak punya izin akses" });
    }

    next();
  };
};

module.exports = { authenticate, authorizeRole };
