process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

require('dotenv').config();

const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const API_KEY = process.env.API_KEY;

app.use((req, res, next) => {
const userKey = req.headers['x-api-key'];
if (userKey !== API_KEY) {
return res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
}
next();
});

// Active PORT
const envPort = process.env.PORT || 5000
app.listen(envPort, () => {
  console.log(`Server running on PORT ${envPort}`);
});

// Routes
const userRoutes = require('./routes/usersroutes');
const todolistroutes = require('./routes/todolistroutes');

// Active Routes
app.use('/users', userRoutes);
app.use('/todolist', todolistroutes);

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Route tidak ditemukan!',
  });
});