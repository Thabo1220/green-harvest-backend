const express = require('express');
const router = express.Router();
const { makeDeposit } = require('../controllers/depositController');

// POST /api/deposit
router.post('/', makeDeposit);

module.exports = router;
