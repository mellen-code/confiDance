// const express = require('express')
// const router = express.Router()

const Story = require('../models/Story')


module.exports = {

// @desc Show add page
// @route GET /entries/add
    newEntry: (req, res) => {
        res.render('entries/add')
    },

// @desc Process add form
// @route POST /stories
    addEntry: async (req, res) => {
    try {
        // create a new key in the body being passed and add the User's id to it.
        req.body.user = req.user.id
        // Then the body, with the User id added, is passed to the database.
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
},

// @desc Show all public stories (feed)
// @route GET /entries
    getEntries: async (req, res) => {
    try {
        const stories = await Story.find({ status: 'public'})
            .populate('user')
            .sort({ createdAt: -1})
            .lean()
            // lean converts from Mongoose object to json object for Handlebars

        res.render('entries/index', {
            stories
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
},

// @desc Show single story 
// @route GET /stories/:id
    getSingleEntry: async (req, res) => {
    try {
        let story = await Story.findById(req.params.id)
            .populate('user')
            .lean()        

        if (!story) {
            return res.render('error/404')
        }

        res.render('entries/show', {
            story
        })
    } catch (err) {
        console.error(err)
        res.render('error/404')
    }
},

// @desc Show edit page
// @route GET /entries/edit/:id
    getEditPage: async (req, res) => {
    try {
        const story = await Story.findOne({
            _id: req.params.id
        }).lean()
    
        if (!story) {
            return res.render('error/404')
        }
    
        if (story.user != req.user.id) {
            res.redirect('/entries')
        } else {
            res.render('entries/edit', {
                story,
            })
        }
    } catch (error) {
        console.error(err)
        return res.render('error/500')
    }   
},

// @desc Update story
// @route PUT /stories/:id (method override)
    editEntry: async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).lean()

        if (!story) {
            return res.render('error/404')
        }

        if (story.user != req.user.id) {
            res.redirect('/entries')
        } else {
            story = await Story.findOneAndUpdate({_id: req.params.id}, req.body, {
                new: true,
                runValidators: true
            })
            res.redirect('/dashboard')
            }
    } catch (error) {
        console.error(err)
        return res.render('error/500')
    }
},

// @desc Delete entry
// @route DELETE /entries/:id
    deleteEntry: async (req, res) => {
    try {
        await Story.remove({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
},

// @desc User public entries
// @route GET /entries/user/:userId
    showUserEntries: async (req, res) => {
    try {
        const stories = await Story.find({
            user: req.params.userId,
            status: 'public',
        })
        .populate('user')
        .sort({ createdAt: -1})
        .lean()

        const firstName = stories[0].user.firstName

        res.render('entries/userIndex', {
            stories,
            firstName
        })
        console.log(firstName)
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
}

}
