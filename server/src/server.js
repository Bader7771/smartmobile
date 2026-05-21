import 'dotenv/config';
import { fileURLToPath } from 'url';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/User.js';
import authRoutes from './routes/auth.js';
import carRoutes from './routes/cars.js';
import { uploadDir } from './middleware/upload.js';

const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const isDirectRun = process.argv[1] === __filename;
const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENT_URL
].filter(Boolean);

let databaseConnection = null;
let adminSeeded = false;

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(uploadDir));

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Server running' });
});

const ensureAdminUser = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password || adminSeeded) {
    return;
  }

  const existingAdmin = await User.findOne({ email: email.toLowerCase().trim() });
  if (existingAdmin) {
    adminSeeded = true;
    return;
  }

  await User.create({
    name: 'Admin',
    email,
    password
  });

  adminSeeded = true;
  console.log(`Admin user created: ${email}`);
};

export const connectDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!databaseConnection) {
    databaseConnection = mongoose.connect(process.env.MONGODB_URI);
  }

  await databaseConnection;
  await ensureAdminUser();

  return mongoose.connection;
};

const withDatabase = async (_req, _res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    next(error);
  }
};

app.use('/api/auth', withDatabase, authRoutes);
app.use('/api/cars', withDatabase, carRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);

  if (error.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'Not allowed by CORS' });
  }

  if (error.message === 'MONGODB_URI is required') {
    return res.status(500).json({ message: 'Database connection is not configured' });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }

  if (error.name === 'CastError') {
    return res.status(404).json({ message: 'Resource not found' });
  }

  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'Image size must be 5MB or less' });
  }

  return res.status(500).json({ message: 'Server error' });
});

if (isDirectRun) {
  connectDatabase()
    .then(() => {
      const server = app.listen(port, () => {
        console.log(`API server running on http://localhost:${port}`);
      });

      server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
          console.error(`Port ${port} is already in use. Set PORT to another value or stop the existing process.`);
          process.exitCode = 1;
          return;
        }

        throw error;
      });
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}

export default app;
