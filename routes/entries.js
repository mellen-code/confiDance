const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const entriesController = require('../controllers/entries')

router.get('/add', ensureAuth, entriesController.newEntry)

router.post('/', ensureAuth, entriesController.addEntry) 

router.get('/', ensureAuth, entriesController.getEntries)

router.get('/:id', ensureAuth, entriesController.getSingleEntry) 

router.get('/edit/:id', ensureAuth, entriesController.getEditPage)

router.put('/:id', ensureAuth, entriesController.editEntry)

router.delete('/:id', ensureAuth, entriesController.deleteEntry)

router.get('/user/:userId', ensureAuth, entriesController.showUserEntries)



module.exports = router