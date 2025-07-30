// controllers/auth.controller.js
import User from "../models/user.model.js";
import { signupSchema, loginSchema } from "../validators/auth.validator.js";
import { hashPassword, comparePassword, generateToken } from "../utils/auth.js";

export const signup = async (req, res) => {
  const { error } = signupSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const existing = await User.findOne({ where: { email: req.body.email } });
    if (existing) return res.status(409).json({ error: "Email already in use" });

    const user = await User.create({
      ...req.body,
      password: await hashPassword(req.body.password),
    });

    const token = generateToken({ id: user.id, role: user.role });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Signup failed", detail: err.message });
  }
};

export const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  console.log("Request body is:", req.body); 
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await comparePassword(req.body.password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken({ id: user.id, role: user.role });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed", detail: err.message });
  }
};
