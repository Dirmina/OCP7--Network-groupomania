const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectdb = require('./database/connection-db');
const app = express();

const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')
const modoRoutes = require('./routes/modos')

app.connect(connectdb);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

//Définition des routes
app.use('/api/auth', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/modo', modoRoutes)

module.exports = app;
