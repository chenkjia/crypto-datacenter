'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const schema = new Schema({
    market: { type: String },
    from: { type: String },
    gas: { type: String },
    gasPrice: { type: String },
    maxFeePerGas: { type: String },
    maxPriorityFeePerGas: { type: String },
    hash: { type: String },
    funcName: { type: String },
    amountIn: { type: String },
    amountOutMin: { type: String },
    amountInNumber: { type: Number },
    amountOutMinNumber: { type: Number },
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
