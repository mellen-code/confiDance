// PASS IN PASSPORTJS GOOGLEOAUTH20 STRATEGY:

const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://thorough-leodora-mariesmith-a32b1710.koyeb.app/auth/google/callback',
        scope: ['profile']
    },
    async (accessToken, refreshToken, profile, done) => {
        // console.log(profile)
        const newUser = {
            googleID: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }

        try {
            let user = await User.findOne({ googleID: profile.id })

            if (user) {
                done(null, user)
                // console.log(user)
            }
            else {
                user = await User.create(newUser)
                done(null, user)
            }
            // console.log(user)
        } catch (err) {
            console.error(err)
        }
        // console.log(profile)
        
    }))

    // Serialize/Deserialize = telling Passport how to save a User:
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })
}