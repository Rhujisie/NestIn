const mongoose  = require('mongoose')
const ReviewSchema = new mongoose.Schema({
        cleaniness:{
            type: Number,
            default: 3
        },
        host:{
            type: Number,
            default: 3
        },
        location:{
            type: Number,
            default: 3
        },
        value:{
            type: Number,
            default: 3
        },
        accuracy:{
            type: Number,
            default: 3
        },
        review:{
            type: String
        },
        userID: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        placeID:{
            type: mongoose.Types.ObjectId,
            ref: 'Place',
            required: true,
        } 
    }
)

module.exports = mongoose.model('Review', ReviewSchema)