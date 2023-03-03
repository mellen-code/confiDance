const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @desc Classes
// @route GET /classes
router.get('/index', ensureAuth, async (req, res) => {
    try {
        res.render('classes/index')
    } catch (error) {
        console.error(err)
        res.render('error/500')
    } 
})

module.exports = router