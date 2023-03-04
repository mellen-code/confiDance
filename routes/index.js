const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const indexController = require('../controllers/index')

// @desc Login/landing page
// @route GET /
router.get('/', indexController.getLogin)

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, indexController.getDashboard)

// @desc Classes
// @route GET /classes
router.get('/classes', ensureAuth, async (req, res) => {
    try {
        console.log('found it')
        res.render('classes/index')
    } catch (error) {
        console.error(err)
        res.render('error/500')
    } 
})

module.exports = router