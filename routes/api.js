const express = require('express')
const router = express.Router()

/* imnport controllers */
const BlogController = require('../controllers/BlogController')
const UserController = require('../controllers/UserController')

/* initialize routes */
router.get('/', (req, res) => res.send('Nothing to do here'))

/* users */
router.post('/users/register', UserController.register)
router.post('/users/login', UserController.login)

/* blogs */
router.get('/blogs', BlogController.index)
router.post('/blogs', BlogController.store)

module.exports = router