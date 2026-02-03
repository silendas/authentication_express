const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, tier: user.membershipTier, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
};

let isAdmin = (user) => {
  if (user.role === "admin") {
    return true;
  }
};

exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).send("User sudah terdaftar");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      membershipTier: "A",
    });

    const token = generateToken(newUser);
    res.cookie("token", token, { httpOnly: true });

    isAdmin(newUser)
      ? res.redirect("/admin/articles")
      : res.redirect("/dashboard");
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(400).json({ message: "Email tidak ditemukan" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Password salah" });

    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });

    isAdmin(user)
      ? res.redirect("/admin/articles")
      : res.redirect("/dashboard");
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};

exports.socialCallback = (req, res) => {
  try {
    const token = generateToken(req.user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });
    isAdmin(req.user)
      ? res.redirect("/admin/articles")
      : res.redirect("/dashboard");
  } catch (err) {
    res.redirect("/login");
  }
};
