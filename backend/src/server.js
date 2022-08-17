const app = require('./core/app');
const config = require('./config');

app.listen(config.APP_PORT, () => {
  console.log('- server started -');
});
