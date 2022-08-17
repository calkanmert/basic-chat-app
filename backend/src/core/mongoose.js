const mongoose = require('mongoose');
const config = require('../config');

mongoose.connection.once('open', () => {
  console.log('- connected to database -');
});

module.exports = () => {
  mongoose.connect(config.MONGO_URI);
};
