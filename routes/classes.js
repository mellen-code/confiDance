const express = require('express')
const router = express.Router()
const classesController = require('../controllers/classes')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/index', classesController.getIndex)

module.exports = router