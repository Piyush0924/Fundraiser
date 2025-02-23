const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  transactionId: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  pancard: { type: String },
});

module.exports = mongoose.model('Transaction', transactionSchema);
