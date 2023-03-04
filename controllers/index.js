const Story = require('../models/Story')

module.exports = {

// @desc Login/landing page
// @route GET /
    getLogin: (req, res) => {
        res.render('login', {
            layout: 'login',
        })
    },


// @desc Dashboard
// @route GET /dashboard
    getDashboard: async (req, res) => {
        try {
            const stories = await Story.find({ user: req.user.id }).lean()
    
            res.render('dashboard', {
                name: req.user.firstName,
                stories
            })
        } catch (error) {
            console.error(err)
            res.render('error/500')
        }   
    }
}