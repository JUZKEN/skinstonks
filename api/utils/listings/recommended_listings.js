const config = require('config');
const winston = require('winston');
const Listing = require('../models/listing');
const BitskinsAPI = require('./BitskinsAPI');

const API = new BitskinsAPI(config.get('BITSKINS_API_KEY'), config.get('BITSKINS_SECRET'));

module.exports = async function() {
   console.time('Finished searching in');

   let items_on_sale = await API.getRequest('get_price_data_for_items_on_sale', {
      app_id: '730'
   });
   let items = items_on_sale.data.items;

   for (let i = 0; i < items.length; i++) {
      if (items[i].total_items <= config.get('SEARCH.MIN_TOTAL_ITEMS') || parseFloat(items[i].lowest_price) < config.get('SEARCH.MIN_PRICE') || parseFloat(items[i].lowest_price) > config.get('SEARCH.MAX_PRICE')) continue;
      
      winston.info(`${items[i].market_hash_name} (${i+1}/${items.length})`);

      let recommendedListing = await getRecommendedListing(items[i].market_hash_name, items[i].lowest_price);
      if (recommendedListing == false) continue;

      let isDuplicated = await Listing.findOne({ item_id: recommendedListing.item_id });
      if (isDuplicated) continue;

      const newListing = new Listing(recommendedListing);
      await newListing.save();
   }
   console.timeEnd('Finished searching in');
}

async function getRecommendedListing(market_hash_name, lowest_price) {
   // Get other listings
   let other_listings = await API.getRequest('get_inventory_on_sale', {
      market_hash_name: market_hash_name,
      sort_by: 'price',
      order: 'asc'
   });
   if (other_listings.data.items.length == 0) return false;
   let items = other_listings.data.items;
   if(items[0].item_type == 'Container' || items[0].item_type == 'Sticker') return false;

   let cheapestItem = parseFloat(items[1].price);
   cheapestItem = (cheapestItem * 0.95) * 0.96; // Price -5% sale fee & -4% withdraw fee

   let potentialProfit = parseFloat(cheapestItem - lowest_price); // Potential profit
   if (potentialProfit > config.get('SEARCH.MIN_POTENTIAL_PROFIT')) return {
      item_id: items[0].item_id,
      market_hash_name: items[0].market_hash_name,
      price: items[0].price,
      image: items[0].image,
      withdrawable_at: items[0].withdrawable_at,
      potential_profit: potentialProfit,
   };
   return false;
}