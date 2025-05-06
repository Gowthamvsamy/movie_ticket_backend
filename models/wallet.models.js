const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    user_id: {
        type: String,
        unique: true,
    },
    balance: {
        type: Number,
    }
});

module.exports = mongoose.model('Wallet', walletSchema)
