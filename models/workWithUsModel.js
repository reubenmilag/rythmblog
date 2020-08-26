const mongoose = require('mongoose')

const workWithUsSchema = new mongoose.Schema({
    workWithMe_brandName: {
        type: String,
        default: 'no brand name recieved'
    },
    workWithUs_name: {
        type: String,
        default: 'no name recieved'
    },
    workWithUs_phone: {
        type: Number,
        default: 0
    },
    workWithUs_emailAddress: {
        type: String,
        default: 'no email recieved'
    },
    workWithMe_message: {
        type: String,
        default: 'no message recived'
    }
})




const workWithUsModel = mongoose.model('businessRequest', workWithUsSchema)
module.exports = workWithUsModel