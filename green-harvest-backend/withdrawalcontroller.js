const Withdrawal = require('../models/Withdrawal');
const User = require('../models/User');

// Placeholder for sending crypto
const { sendCrypto } = require('../utils/cryptoAPI');

exports.requestWithdrawal = async (req, res) => {
  const { userId, amount, cryptoType, walletAddress } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user || user.balance < amount)
      return res.status(400).json({ message: 'Insufficient balance' });

    // Reduce user balance (instant for now)
    user.balance -= amount;
    await user.save();

    // Send crypto (placeholder)
    const txId = await sendCrypto(cryptoType, walletAddress, amount);

    const withdrawal = new Withdrawal({
      user: userId,
      amount,
      cryptoType,
      txId,
      status: 'processed'
    });
    await withdrawal.save();

    res.status(201).json({ message: 'Withdrawal processed', withdrawal });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
