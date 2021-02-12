const auth = require('../middleware/auth');
const keys = require('../middleware/keys');
const express = require('express');
const router = express.Router();

const Listing = require('../controllers/listing');

router.get('/', auth, Listing.index);
router.post('/buy/:item_id', [auth, keys], Listing.buy);

module.exports = router;