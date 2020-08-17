const mongoose = require('mongoose')

const UserMessageSchema = new mongoose.Schema({
    sender_name: {
        type: String,
        default: "User"
    },
    sender_phone: {
        type: Number
    },
    sender_email: {
        type: String
    },
    sender_message: {
        type: String,
        default: "No user message"
    },
    date: {
        type: Date,
        default: Date.now
    }
})




const userMessage = mongoose.model('contactUsMessages', UserMessageSchema)
module.exports = userMessage