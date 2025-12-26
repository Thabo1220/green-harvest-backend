const User = require('../models/User');
const Deposit = require('../models/Deposit');

// Call this function every day (setInterval or cron)
exports.creditProfits = async () => {
  const deposits = await Deposit.find({ status: 'confirmed' });

  for (let dep of deposits) {
    const now = new Date();
    const diff = now - dep.createdAt;
    const fiveDays = 5 * 24 * 60 * 60 * 1000;

    if (diff >= fiveDays && !dep.profitCredited) {
      const user = await User.findById(dep.user);
      user.balance += dep.amount * 1.5; // 50% profit
      await user.save();
      dep.profitCredited = true;
      await dep.save();
      console.log(`Profit credited for user ${user.email}`);
    }
  }
};
