const express = require('express');
const { createDonation, getAllDonations } = require('../controllers/donationController');
const authMiddleware = require('../middleware/authMiddleware'); // For protecting routes

const router = express.Router();

router.post('/', authMiddleware, createDonation); // Only authenticated users can donate
router.get('/', getAllDonations); // Fetch all donations

module.exports = router;
