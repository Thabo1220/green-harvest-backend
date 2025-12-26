const Deposit = require('../models/Deposit');
const User = require('../models/User');

// Placeholder for crypto API
const { generateDepositAddress } = require('../utils/cryptoAPI');

exports.makeDeposit = async (req, res) => {
  const { userId, amount, cryptoType } = req.body;

  try {
    // Generate unique deposit address for user
    const address = await generateDepositAddress(cryptoType);

    const deposit = new Deposit({
      user: userId,
      amount,
      cryptoType,
      txId: address, // For testing, address is txId
      status: 'pending'
    });

    await deposit.save();

    res.status(201).json({ message: 'Deposit initiated', deposit });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
