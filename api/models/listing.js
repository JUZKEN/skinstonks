const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
   item_id: {
      type: String,
      required: true,
      unique: true
   },
   market_hash_name: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   potential_profit: Number,
   image: {
      type: String,
      required: true
   },
   withdrawable_at: Date,
}, {timestamps: true});

module.exports = mongoose.model('Listing', listingSchema);