const User = require('../models/user');
const Listing = require('../models/listing');

exports.index = async (req, res, next) => {
   const listings = await Listing.find();
   if (!listings.length) return res.status(404).json({message: 'Could not find any listings.'});

   res.status(200).send(listings);
};

exports.favorite = async (req, res, next) => {
   const listing = await Listing.findById(req.params.id);
   if (!listing) return res.status(404).json({message: 'Could not find the listing with the given id.'});

   const user = await User.findById(req.user._id);

   const isDuplicated = user.favorite_items.includes(req.params.id);
   if (isDuplicated) return res.status(409).json({message: 'This item is already in your favorites.'});

   await user.favorite_items.push(listing._id);
   await user.save();

   res.status(200).json({message: 'Listing successfully added to your favorites.'});
}

exports.unfavorite = async (req, res, next) => {
   await User.findByIdAndUpdate(req.user._id, { $pull: { favorite_items: req.params.id } });
   res.status(200).json({message: 'Listing was unfavorited'});
}

exports.me = async (req, res, next) => {
   const user = await User.findById(req.user._id);
   if (!user.favorite_items.length) return res.status(404).json({message: 'You have no listings in your favorites.'});

   res.status(200).send(user.favorite_items);
}