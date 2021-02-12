const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();

const User = require('../controllers/user');
const Bitskins = require('../controllers/bitskins');

router.get('/', [auth, admin], User.index);
router.get('/me', auth, User.me);
router.put('/me', auth, validate.userUpdate, User.update);
router.post('/update_api_keys', auth, validate.set_api_keys, Bitskins.update);
router.delete('/:id', [auth, admin], User.delete);

module.exports = router;