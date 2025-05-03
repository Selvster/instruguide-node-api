import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv({ path: "./config.env" });

const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

const JWT_SECRET = process.env.JWT_SECRET;

const TOKEN_EXPIRY = process.env.JWT_EXPIRY;

export const adminLogin = (req, res) => {
  const { email, password } = req.body;
  if (
    email !== ADMIN_CREDENTIALS.email ||
    password !== ADMIN_CREDENTIALS.password
  ) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Create JWT token
  const token = jwt.sign({ role: "admin", email }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });

  res.status(200).json({ token });
};

export const protectRoute = (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decoded;
    next();
  });
};
