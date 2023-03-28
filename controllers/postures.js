const Posture = require('../models/Posture')

module.exports = {
    // @desc Show postures homepage
    // @route GET /postures/
    getIndex: async (req, res) => {
        try {
            res.render('postures/index')
        } catch (error) {
            console.log(error)
        } 
    },

    // @desc Show single posture
    // @route GET /postures/:name
    getConfidence: async (req, res) => {
        try {
            const posture = await Posture.findOne({ name: 'confidence'})
                .lean()
                // lean converts from Mongoose object to json object for Handlebars
    
            res.render('postures/confidence', {
                posture
            })

        } catch (err) {
            console.error(err)
            res.render('error/500')
        }
    },
}