'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const schema = new Schema({
    market: { type: String },
    from: { type: String },
    gas: { type: Number },
    gasPrice: { type: Number },
    maxFeePerGas: { type: Number },
    maxPriorityFeePerGas: { type: Number },
    hash: { type: String },
    funcName: { type: String },
    amountIn: { type: Number },
    amountOutMin: { type: Number },
    input: { type: String },
    nonce: { type: String },
    to: { type: String },
    transactionIndex: { type: String },
    value: { type: String },
    type: { type: String },
    chainId: { type: String },
    collectTime: { type: Date, default: Date.now },
    createTime: { type: Date, default: Date.now },
  });

  return mongoose.model('Target', schema, 'target');
};
