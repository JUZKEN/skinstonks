const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();

const Listing = require('../controllers/listing');

// Index all listings
router.get('/', auth, Listing.index);

// Add listing to favorites
router.post('/swipe/:id', [auth, swipe], Listing.swipe);

// Delete listing from favorites
router.delete('/unfavorite/:id', auth, Listing.unfavorite);

// Remove listing from disliked items
router.post('/undislike/:id', auth, Listing.undislike);

module.exports = router;