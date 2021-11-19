const express = require('express')
const router = express.Router()
const { views } = require('../services/services')

/* import middlewares */
const Auth = require('../middlewares/auth-api')

/* imnport controllers */
const BlogController = require('../controllers/BlogController')
const UserController = require('../controllers/UserController')

/* initialize routes */
router.get('/', (req, res) => {
    res.sendFile(views('../resources/views/welcome.html'))
})

/* users */
router.get('/user', Auth, UserController.user)
router.post('/users/register', UserController.register)
router.post('/users/login', UserController.login)
router.post('/users/logout', Auth, UserController.logout)

/* blogs */
router.get('/blogs', Auth, BlogController.index)
router.post('/blogs', Auth, BlogController.store)

module.exports = router