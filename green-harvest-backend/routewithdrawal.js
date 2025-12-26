const express = require('express');
const router = express.Router();
const { requestWithdrawal } = require('../controllers/withdrawalController');

// POST /api/withdrawal
router.post('/', requestWithdrawal);

module.exports = router;
