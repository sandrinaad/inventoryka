const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { prisma } = require('../db');
require("dotenv").config();


const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    const userExist = await prisma.user.findUnique({ where: { email } });
    if (userExist) return res.status(409).json({ message: "Email sudah digunakan" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { nama, email, password: hashedPassword, role_id: 3 }
    });

    res.status(201).json({ message: "Register berhasil", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "Email tidak ditemukan" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: "Password salah" });

    // generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role_id: user.role_id },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

     res.cookie("token", token, { httpOnly: true, secure: false });

    res.json({ message: "Login berhasil", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout berhasil" });
};

module.exports = { register, login, logout };
