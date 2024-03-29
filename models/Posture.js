const mongoose = require('mongoose')

const PostureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    pose: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    briefDescription: {
        type: String,
        required: false,
    }
    
})

module.exports = mongoose.model('Posture', PostureSchema)