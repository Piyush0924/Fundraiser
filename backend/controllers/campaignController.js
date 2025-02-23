const Campaign = require('../models/Campaign');

exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate('createdBy', 'name email');
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch campaigns', error: error.message });
  }
};

exports.createCampaign = async (req, res) => {
  const { name, description, totalGoal, referenceCode } = req.body;
  try {
    if (!name || !description || !totalGoal || !referenceCode) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingCampaign = await Campaign.findOne({ referenceCode });
    if (existingCampaign) {
      return res.status(400).json({ message: 'Reference code must be unique' });
    }

    const newCampaign = new Campaign({
      name,
      description,
      totalGoal,
      referenceCode,
      createdBy: req.user.userId,  // Assuming you're using authentication middleware
    });

    await newCampaign.save();
    res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create campaign', error: error.message });
  }
};
