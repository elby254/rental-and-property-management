require('dotenv').config();

// imports
const at = require('./config/at');
const sms = at.SMS;

console.log('USERNAME:', process.env.AT_USERNAME);
console.log('KEY EXISTS:', !!process.env.AT_API_KEY);

sms.send({
  to: '+254711111111',
  message: 'Test SMS'
})
.then(console.log)
.catch(console.error);