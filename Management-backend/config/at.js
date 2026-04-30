// africastalking SDK initialization
const AfricasTalking = require('africastalking');
const at = AfricasTalking({
  apiKey: process.env.AT_API_KEY,       // sandbox API key
  username: process.env.AT_USERNAME,    // sandbox username
});

module.exports = at;