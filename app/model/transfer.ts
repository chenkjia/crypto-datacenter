'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const schema = new Schema({
    market: { type: String },
    blockHash: { type: String },
    blockNumber: { type: String },
    from: { type: String },
    gas: { type: String },
    gasPrice: { type: String },
    maxFeePerGas: { type: String },
    maxPriorityFeePerGas: { type: String },
    hash: { type: String },
    input: { type: String },
    nonce: { type: String },
    to: { type: String },
    transactionIndex: { type: String },
    value: { type: String },
    type: { type: String },
    chainId: { type: String },
    v: { type: String },
    r: { type: String },
    s: { type: String },
    createTime: { type: Date, default: Date.now },
  });

  return mongoose.model('Transfer', schema, 'transfer');
};
