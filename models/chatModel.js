// models/Chat.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    ip: { type: String, required: true },
    message: { type: String, required: true },
    sender: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: 'processing' }
});

module.exports = mongoose.model('Chat', chatSchema);
