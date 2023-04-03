const express = require('express')
const router = express.Router()
const posturesController = require('../controllers/postures')

router.get('/', posturesController.getIndex)

router.get('/pose/', posturesController.getPosture)

router.get('/pose/:value', posturesController.getPosture)

module.exports = router