const Keys = require('../models/keys');

module.exports = async function(req, res, next) {
   let userKeys = await Keys.findOne({user: req.user._id});
   if (!userKeys) return res.json({message: "The Bitskins API Keys weren't set for this user"});

   req.user_keys = userKeys;
   next();
}