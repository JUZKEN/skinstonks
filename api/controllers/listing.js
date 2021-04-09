const User = require('../models/user');
const Listing = require('../models/listing');
const _ = require('lodash');

exports.index = async (req, res, next) => {
   const listings = await Listing.find();
   if (!listings.length) return res.status(404).json({message: 'Could not find any listings.'});

   res.status(200).send(listings);
};

exports.swipe = async (req, res, next) => {
   swipeIsFavorite = req.body.swipe_is_favorite;

   const listing = await Listing.findById(req.params.id);
   if (!listing) return res.status(404).json({message: 'Could not find the listing with the given id.'});

   const user = await User.findById(req.user._id);

   let userItemsTarget = swipeIsFavorite ? user.favorite_items : user.disliked_items;
   
   const isDuplicated = userItemsTarget.includes(req.params.id);
   if (isDuplicated) return res.status(409).json({message: 'This item was already swiped.'});

   await userItemsTarget.push(listing._id);
   await user.save();

   res.status(200).json(_.pick(user, ['favorite_items', 'disliked_items']));
};

exports.unfavorite = async (req, res, next) => {
   await User.findByIdAndUpdate(req.user._id, { $pull: { favorite_items: req.params.id } });
   res.status(200).json({message: 'Listing was unfavorited'});
}

exports.undislike = async (req, res, next) => {
   await User.findByIdAndUpdate(req.user._id, { $pull: { disliked_items: req.params.id } });
   res.status(200).json({message: 'Listing was undisliked'});
}