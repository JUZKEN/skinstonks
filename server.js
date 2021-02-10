require('express-async-errors');
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const path = require('path');
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

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
   app.use(express.static(path.join(__dirname, 'client/build')));
};

// Routes
require('./routes')(app);

// Bitskins
// require('./recommended_listings')();
require('./recommended_listings-socket')();

const port = process.env.PORT || 3001;
app.listen(port, () => winston.info(`Listening on port ${port}...`));