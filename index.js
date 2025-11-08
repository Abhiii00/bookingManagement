const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./src/config/config');
const route = require('./src/route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api', route);

app.get('/', (req, res) => {
  res.json('API is working');
});

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect DB', err);
  });
