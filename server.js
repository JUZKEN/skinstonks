require('express-async-errors');
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const app = express();

require('./logging')();
require('./config')();

// Connect to database
const database = config.get('MONGODB_URI');
mongoose.connect(database, {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => winston.info('Connected to MongoDB...'));

// View engine
app.set('view engine', 'pug');

// Routes
require('./routes')(app);

const port = process.env.PORT || 3001;
app.listen(port, () => winston.info(`Listening on port ${port}...`));