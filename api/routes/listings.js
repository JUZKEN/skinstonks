const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();

const Listing = require('../controllers/listing');

// Index all listings
router.get('/', auth, Listing.index);

// Add listing to favorites
router.post('/favorite/:id', auth, Listing.favorite);

// Delete listing from favorites
router.delete('/unfavorite/:id', auth, Listing.unfavorite);

// Index user's favorite listings
router.get('/me', auth, Listing.me);

// TODO: Remove listing route (+ use this endpoint when item sold/removed)

module.exports = router;