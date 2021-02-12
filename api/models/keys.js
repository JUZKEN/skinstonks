const mongoose = require('mongoose');
const { encrypt, decrypt } = require('../utils/encryption');

const keysSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    api_key: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true
   },
}, { timestamps: true });

keysSchema.pre('save', function(next) {
    const keys = this;
    if (!keys.isModified('api_key') && !keys.isModified('secret')) return next();

    keys.api_key = encrypt(keys.api_key);
    keys.secret = encrypt(keys.secret);

    next();
});

keysSchema.methods.getDecryptedKeys = function() {
    const keys = this;
    return { api_key: decrypt(keys.api_key), secret: decrypt(keys.secret)};
 }

module.exports = mongoose.model('Bitskins', keysSchema);