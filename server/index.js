const express = require('express');
const rentalsRoutes = require('./routes/rentals');
const usersRoutes = require('./routes/users');
const { errorHandler } = require('./middlewares');

const app = express();
const PORT = process.env.PORT || 4000;

// MIDDLEWARE
app.use(express.json());
app.use(errorHandler);

// API ROUTES
app.use('/api/v1/rentals', rentalsRoutes);
app.use('/api/v1/users', usersRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
