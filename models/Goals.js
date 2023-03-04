const mongoose = require('mongoose')

const GoalsSchema = new mongoose.Schema({
    googleID: {
        type: String,
        required: false,
    },
    entriesGoal: {
        type: Number,
        required: false,
    },
    classesGoal: {
        type: Number,
        required: false,
    },
})

module.exports = mongoose.model('Goal', GoalsSchema)