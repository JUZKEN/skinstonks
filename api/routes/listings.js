const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

const Listing = require('../controllers/listing');

router.get('/', auth, Listing.index);
router.post('/buy/:item_id', auth, Listing.buy);

module.exports = router;