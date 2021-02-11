const _ = require('lodash');
const config = require('config');
const Listing = require('../models/listing');
const Item = require('../models/item');
const BitskinsAPI = require('../utils/BitskinsAPI');
const listing = require('../models/listing');

// TODO: Replace with user api key + secret
const API = new BitskinsAPI(config.get('BITSKINS_API_KEY'), config.get('BITSKINS_SECRET'));

exports.index = async (req, res, next) => {
   const listings = await Listing.find();
   if (!listings.length) return res.status(404).json({message: 'Could not find any listings.'});

   res.send(listings);
};

exports.buy = async (req, res, next) => {
   const { item_id } = req.params;

   const listing = await Listing.findOne({ item_id: item_id});
   if (!listing) return res.status(404).json({message: 'Listing with the given ID was not found.'});

   const response = await API.getRequest('buy_item', {
      item_ids: item_id,
      prices: listing.price,
      app_id: 730
   });
   if (response.status != 'success') return res.status(response.status).json(response.data);


   let boughtItem = new Item(_.pick(listing, ['item_id', 'market_hash_name', 'image', 'withdrawable_at']))
   _.assign(boughtItem, {
      user: req.user._id,
      bought_for: listing.price
   });
   await boughtItem.save();

   res.status(200).json({ item: boughtItem });
};