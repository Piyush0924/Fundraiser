const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  taxExemption: { type: Boolean, default: false },
  referenceCode: { type: String, required: true },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  amount: { type: Number, required: true, min: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
