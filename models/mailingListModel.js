const mongoose = require('mongoose')

const mailingListSchema = new mongoose.Schema({
    mailingRecepient: {
        type: String
    },
    mailingEmail: {
        type: String
    },
    subscribeDate: {
        type: Date,
        default: Date.now
    }
})




const mailingList = mongoose.model('mailingList', mailingListSchema)
module.exports = mailingList