const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
   },
   item_id: {
      type: String,
      required: true,
      unique: true
   },
   market_hash_name: {
      type: String,
      required: true
   },
   bought_for: {
      type: Number,
      required: true
   },
   is_sold: {
      type: Boolean,
      default: false
   },
   image: {
      type: String,
      required: true
   },
   withdrawable_at: Date,
}, {timestamps: true});

module.exports = mongoose.model('Item', itemSchema);