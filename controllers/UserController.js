const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.index = (req, res) => {
    User.findAll().then(users => {
        res.send({
            users: users
        })
    }).catch(err => {
        res.status(403).send(err)
    })
}

exports.register = (req, res) => {
    let passwordValidation = validatePassword(req)
    if (!passwordValidation.valid) {
        res.send({
            errors: [
                { message: passwordValidation.message }
            ]
        }).status(403)
        return
    }

    User.create({
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        full_name: `${req.body.first_name} ${req.body.last_name}`,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    }).then(user => {
        res.send(user)
    }).catch(err => {
        res.send(err).status(403)
    })
}

exports.login = async (req, res) => {
    let user = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if (!user) {
        res.send({
            errors: [
                { message: 'User not found' }
            ]
        }, 404)
        return
    }
    
    if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
            errors: [
                { message: 'Wrong password. Please try again.' }
            ]
        }, 403)
        return
    }

    let token = createToken(user)

    res.send({
        token: token
    })
}

exports.user = (req, res) => {
    res.send('hehe user eto')
}

/* additional functions */
function createToken (user) {
    let payload = {
        user_id: user.id,
        email: user.email
    }
    let token = jwt.sign(payload, process.env.APPLICATION_KEY, {
        expiresIn: 604800
    })

    return token
}

function validatePassword (req) {
    let valid = true
    let message = ''

    if (!req.body.password) {
        message = 'Password is required'
        valid = false
    }

    if (!req.body.password_confirmation) {
        message = 'Password confirmation is required'
        valid = false
    }

    if (req.body.password != req.body.password_confirmation) {
        message = 'Password confirmation does not match'
        valid = false
    }

    return {
        valid: valid,
        message: message
    }
}