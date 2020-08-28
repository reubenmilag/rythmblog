const mongoose = require('mongoose')

const serviceRequestSchema = new mongoose.Schema({
    userName: {
        type: String,
        default: "User"
    },
    userPhone: {
        type: Number
    },
    userEmail: {
        type: String
    },
    SOI: {
        type: String,
        default: 'undefined'
    },
    userDate: {
        type: Date,
    },
    TimeSlot: {
        type: String,
    },
    userMessage: {
        type: String
    },
    requestDate: {
        type: Date,
        default: Date.now
    }
})




const serviceRequest = mongoose.model('serviceRequest', serviceRequestSchema)
module.exports = serviceRequest