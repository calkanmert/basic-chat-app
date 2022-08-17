const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  APP_PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/chat-app',
};
