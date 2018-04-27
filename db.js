const models = require('./models');
const config =  require('./config');

module.exports = () => {
  models.sequelize
    .sync({
      force: config.db.forceSync,
      alter: config.db.alter
    })
    .then(function () {
      console.log('db synced!')
    })
    .catch(err => {
      console.error(err)
    })
}