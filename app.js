const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8443;
const dbURI = process.env.dbURI;

// MongoDB connection setup
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get("/api/healthCheck", (req, res) => {
  res.status(200).send({message : "Welcome to PIHU Energy Saving Limited Backend Server"})
})

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Define routes for searchClient and addClient APIs
const clientRoutes = require('./routes/clientRoutes');
app.use('/api/clients', clientRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
