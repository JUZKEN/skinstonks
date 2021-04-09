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

// Add listing to disliked items
router.post('/dislike/:id', auth, Listing.dislike);

// Remove listing from disliked items
router.post('/undislike/:id', auth, Listing.undislike);

// Index user's favorite listings
router.get('/me', auth, Listing.me);

module.exports = router;