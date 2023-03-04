const User = require('../models/User')

module.exports = {

// @route GET /goals/edit
    getEdit: async (req, res) => {
        try {
            const entriesGoal = await User.find().lean()

            res.render('goals/edit', {
                entriesGoal
            })

            console.log(entriesGoal)
            
        } catch (error) {
            console.error(err)
            res.render('error/500')
        }
    }

}