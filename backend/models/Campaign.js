const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  goalAchieved: { type: Number, default: 0 },
  totalGoal: { type: Number, required: true },
  level: { type: String, enum: ['Star', 'Superstar', 'Legend'], default: 'Star' },
  referenceCode: { type: String, required: true, unique: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
