const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();

const User = require('../controllers/user');

// Index all users
router.get('/', [auth, admin], User.index);

// Get own user
router.get('/me', auth, User.me);

// Update own user
router.put('/me', auth, validate.userUpdate, User.update);

// Delete a user
router.delete('/:id', [auth, admin], User.delete);

module.exports = router;