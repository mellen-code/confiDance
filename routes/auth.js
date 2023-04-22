const express = require('express')
const passport = require('passport')
const router = express.Router()


// @desc Auth with Google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['email'] } ))


// @desc Google auth callback. If fails, redirected back home ('/'), if successful, redirected to dashboard:
// @route GET /google-callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), 
(req, res) => {
    res.redirect('/dashboard')
})

// @desc Logout User
// @route /auth/logout
// !Passport 0.6 requires logout function to be async
router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) {return next(err)}
        res.redirect('/')
    })
})



module.exports = router