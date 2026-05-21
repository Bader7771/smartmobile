import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const requireAuth = async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret is not configured' });
    }

    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
