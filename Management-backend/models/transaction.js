const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    tenantID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    propertyID: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;