const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const User = require('../models/User')

// @route GET /goals/edit
router.get('/edit', ensureAuth, async (req, res) => {
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
    
})

module.exports = router