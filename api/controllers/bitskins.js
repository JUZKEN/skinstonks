const Keys = require('../models/keys');

exports.update = async (req, res, next) => {
   const { api_key, secret } = req.body;

   await Keys.findOneAndRemove({ user: req.user._id });

   const newKeys = new Keys({ api_key, secret, user: req.user._id });
   await newKeys.save();
   res.status(200).json({message: 'Bitskins keys were successfully updated.'});
};