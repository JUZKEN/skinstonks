const winston = require('winston');
const config = require('config');
const Listing = require('../../models/listing');
const BitskinsAPI = require('../BitskinsAPI');
const BitskinsWS = require('../BitskinsWS');

const socket = new BitskinsWS;
const API = new BitskinsAPI(config.get('BITSKINS_API_KEY'), config.get('BITSKINS_SECRET'));

module.exports = async function() {

   socket.on('connected', () => {
      console.log('Connecting, listening for events');
   })
   
   socket.on('disconnected', () => {
      console.log('Disconnected, no longer listening for events');
   })
   
   socket.on('inventory_changes:listed', async (data) => {
      if (data.app_id != 730 || parseInt(data.price) < config.get('SEARCH.MIN_PRICE') || parseInt(data.price) > config.get('SEARCH.MAX_PRICE')) return;

      let recommendedListing = await getRecommendedListing(data);
      if (recommendedListing == false) return;

      let isDuplicated = await Listing.findOne({ item_id: data.item_id });
      if (isDuplicated) return;

      const newListing = new Listing(recommendedListing);
      await newListing.save();

      winston.info({
         'item_id': data.item_id,
         'market_hash_name': data.market_hash_name,
         'price': data.price,
         'potential_profit': recommendedListing.potentialProfit,
      });
   });

   socket.on('inventory_changes:delisted_or_sold', async (data) => {
      await Listing.findOneAndDelete({ item_id: data.item_id});
   });

   socket.on('inventory_changes:price_changed', async (data) => {
      const listing = await Listing.findOne({ item_id: data.item_id});
      if (!listing) return;

      let priceDiff = listing.price - parseFloat(data.price);
      let newPotentialProfit = priceDiff + listing.potential_profit;

      listing.potential_profit = newPotentialProfit;
      await listing.save();
   });

}

async function getRecommendedListing(listing) {
   // Get other listings
   let other_listings = await API.getRequest('get_inventory_on_sale', {
      market_hash_name: listing.market_hash_name,
      sort_by: 'price',
      order: 'asc'
   });
   if (other_listings.data.items.length == 0) return false;
   let items = other_listings.data.items;
   if (items.length <= config.get('SEARCH.MIN_TOTAL_ITEMS')) return false;

   // Find the cheapest item in the listings
   let cheapestItem = parseFloat(items[0].price);
   for (let i = 1; i < items.length; i++) {
      if (items[i].item_id == listing.item_id) continue;
      let v = parseFloat(items[i].price);
      cheapestItem = (v < cheapestItem) ? v : cheapestItem;
   }
   cheapestItem = (cheapestItem * 0.95) * 0.96; // Price -5% sale fee & -4% withdraw fee

   // Get potential profit
   let potentialProfit = parseFloat(cheapestItem - listing.price);

   if (potentialProfit > config.get('SEARCH.MIN_POTENTIAL_PROFIT')) return {
      item_id: listing.item_id,
      market_hash_name: listing.market_hash_name,
      price: listing.price,
      image: listing.image,
      withdrawable_at: listing.withdrawable_at,
      potential_profit: potentialProfit,
   };
   return false;
}