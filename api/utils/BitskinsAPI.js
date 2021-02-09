const winston = require('winston');
const axios = require('axios');
var totp = require('notp').totp;
var base32 = require('thirty-two');

class BitskinsAPI {

   constructor(apiKey, secret, appId = 730) {
      this.apiKey = apiKey;
      this.secret = secret;
      this.appId = appId;
   }

   getCode() {
      return totp.gen(base32.decode(this.secret));
   }

   async getRequest(endpoint, parameters) {
      let parametersStr = ''
   
      Object.keys(parameters).forEach(key => {
         parametersStr += `&${key}=${parameters[key]}`;
      });

      parametersStr = parametersStr.replace(/ /g, '%20').replace(/™|★|壱|龍|王|ö/g, '');

      const url = `https://bitskins.com/api/v1/${endpoint}?api_key=${this.apiKey}&code=${this.getCode()}${parametersStr}`;
      try {
         const res = await axios.get(url);
         return res.data;
       } catch (err) {
         winston.error(err.message, err);
       }
   }

}

module.exports = BitskinsAPI;