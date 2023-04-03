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
    getPosture: async (req, res) => {
       
        try {
            const name = req.params.value
            const posture = await Posture.findOne({ name: name})
                .lean()
            res.render('postures/pose', {
                posture
            })
            console.log(name)
        } catch (error) {
            console.error(err)
            res.render('error/500')
        } 
    },
}