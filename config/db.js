const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const connectDB = async() => {
    try {
        // ! Additional properties (useNewUrlParser, useUnifiedTopology, useFindAndModigy) not needed:
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB