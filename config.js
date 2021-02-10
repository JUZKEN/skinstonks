const config = require('config');

module.exports = function() {
   if (!config.get('BITSKINS_API_KEY')) throw new Error('FATAL ERROR: skinstonks_BITSKINS_API_KEY is not defined.');
   if (!config.get('BITSKINS_SECRET')) throw new Error('FATAL ERROR: skinstonks_BITSKINS_SECRET is not defined.');
   if (!config.get('SENDGRID.API_KEY')) throw new Error('FATAL ERROR: SENDGRID_API_KEY is not defined.');
   if (!config.get('SENDGRID.USERNAME')) throw new Error('FATAL ERROR: SENDGRID_USERNAME is not defined.');
   if (!config.get('SENDGRID.PASSWORD')) throw new Error('FATAL ERROR: SENDGRID_PASSWORD is not defined.');
   if (!config.get('SENDGRID.SENDER')) throw new Error('FATAL ERROR: SENDGRID_SENDER is not defined.');
   if (!config.get('JWT_SECRET')) throw new Error('FATAL ERROR: skinstonks_JWT_SECRET is not defined.');
}