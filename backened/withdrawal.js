import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = '/';
  };

  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">Green Harvest Capital</Link>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/deposit" className="hover:underline">Deposit</Link>
        <Link to="/withdraw" className="hover:underline">Withdraw</Link>
        <button onClick={handleLogout} className="bg-white text-green-600 px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;

const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  cryptoType: { type: String, enum: ['USDT','BTC','LTC'], required: true },
  txId: { type: String, default: '' },
  status: { type: String, enum: ['pending','processed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Withdrawal', withdrawalSchema);
