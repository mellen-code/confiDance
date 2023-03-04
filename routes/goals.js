const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const goalsController = require('../controllers/goals')

// @route GET /goals/edit
router.get('/', ensureAuth, goalsController.getEdit)

module.exports = router