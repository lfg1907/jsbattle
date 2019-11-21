const Sequelize = require('sequelize');

module.exports = new Sequelize(
  process.env.DATABASE_URL ||
    'postgres://localhost/jsbattle_db',
  { logging: false }
);
