const mongoose = require('mongoose')

const PostureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    posture: {
        type: String,
        required: true,
    },
    
})

module.exports = mongoose.model('Posture', PostureSchema)