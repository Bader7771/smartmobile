const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

/* Load env vars */
dotenv.config();

/* Connect to MongoDB */
connectDB();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Serve uploaded files */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* API Routes */
app.use('/api/cars', require('./routes/cars'));
app.use('/api/auth', require('./routes/auth'));

/* Health check */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AutoSmart Maroc API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
