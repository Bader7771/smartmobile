import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

const publicUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role
});

router.post('/login', async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret is not configured' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      token,
      ...publicUser(user)
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/me', requireAuth, (req, res) => {
  res.json(publicUser(req.user));
});

export default router;
