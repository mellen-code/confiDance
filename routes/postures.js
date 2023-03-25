const express = require('express')
const router = express.Router()
const posturesController = require('../controllers/postures')

router.get('/', posturesController.getIndex)

router.get('/chooseOne/confidence', posturesController.getConfidence)

module.exports = router