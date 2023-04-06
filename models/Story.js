const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'private',
        enum: ['private', 'public'],
    },
    user: {
        // pulls the user's unique ID from the database:
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        // !this 'required' field should be required because the app will break if the user is not present.
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date(),
    },
    
})



module.exports = mongoose.model('Story', StorySchema)
// a new collection for this schema is automatically made in your database, with the 'name' pluralized, if you do not specify sending your UserSchema to a database here as a 3rd argument!