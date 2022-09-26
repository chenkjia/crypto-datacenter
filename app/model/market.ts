'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const MarketSchema = new Schema({
    name: {
      type: String,
    },
    code: {
      type: String,
    },
  });
  return mongoose.model('Market', MarketSchema, 'market');
};
