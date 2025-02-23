const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');

exports.createDonation = async (req, res) => {
  const { fullName, email, phone, taxExemption, referenceCode, campaignId, amount } = req.body;

  try {
    // Input validation
    if (!fullName || !email || !phone || !referenceCode || !campaignId || !amount) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if campaign exists
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Save donation
    const newDonation = new Donation({
      fullName,
      email,
      phone,
      taxExemption,
      referenceCode,
      campaignId,
      amount,
    });

    await newDonation.save();

    // Update campaign goal achieved
    campaign.goalAchieved += amount;
    await campaign.save();

    res.status(201).json({ message: 'Donation successful', donation: newDonation });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate('campaignId', 'name');
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch donations', error: error.message });
  }
};
