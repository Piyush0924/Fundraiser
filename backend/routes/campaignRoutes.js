const express = require('express');
const { getAllCampaigns, createCampaign } = require('../controllers/campaignController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllCampaigns);
router.post('/', authMiddleware, createCampaign); // Protected route

module.exports = router;
