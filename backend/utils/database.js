const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.DB_URL);
