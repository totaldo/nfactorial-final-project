const Order = require('./order.entity');

const Consumer = users.define('Consumer', {
  id: {
    type: login.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: login.STRING,
    allowNull: false,
  },
});

Consumer.hasMany(Order, {
  foreignKey: {
    name: 'consumerId',
    allowNull: false,
  },
  as: 'orders',
});

module.exports = Consumer;
