const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

/* Load env vars */
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

const localhostOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

const splitOrigins = (value) => {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
};

const configuredOrigins = [
  ...splitOrigins(process.env.CLIENT_URL),
  ...splitOrigins(process.env.FRONTEND_URL),
  ...splitOrigins(process.env.FRONTEND_URLS),
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
]
  .filter(Boolean)
  .map((origin) => origin.replace(/\/$/, ''));

const allowedOrigins = [...new Set([...localhostOrigins, ...configuredOrigins])];

/* Middleware */
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ''))) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Connect once per server/process. Vercel reuses warm functions when possible. */
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({
      message: 'Database connection failed',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message
    });
  }
});

/* Serve uploaded files */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

/* API Routes */
app.use('/api/cars', require('./routes/cars'));
app.use('/api/auth', require('./routes/auth'));

/* Health check */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AutoSmart Maroc API is running' });
});

app.use((error, req, res, next) => {
  console.error('API error:', error.message);
  res.status(error.status || 500).json({
    message: error.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
