const express = require('express');
const rentalRoutes = require('./routes/rentals');

const app = express();
const PORT = process.env.PORT || 4000;

// MIDDLEWARE
app.use(express.json());

// API ROUTES
app.use('/api/v1/rentals', rentalRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
