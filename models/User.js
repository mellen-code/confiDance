const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleID: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    entriesGoal: {
        type: Number,
        default: 0,
    }
})

module.exports = mongoose.model('User', UserSchema)
// a new collection for this schema is automatically made in your database, with the 'name' pluralized, if you do not specify sending your UserSchema to a database here as a 3rd argument!