require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(morgan('dev'));
const corsOptions = { origin: process.env.FRONTEND_URL || '*', credentials: true };
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // if using cookies or auth headers
}));

// Connect DB
connectDB();

// Routes
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/admin', require('./routes/admin'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
