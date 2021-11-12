const express = require('express')
const router = express.Router()

/* imnport controllers */
const BlogController = require('../controllers/BlogController')

/* initiate routes */
router.get('/', (req, res) => res.send('Nothing to do here'))

router.get('/blogs', BlogController.index)

module.exports = router