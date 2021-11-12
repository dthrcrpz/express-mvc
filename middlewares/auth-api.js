const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports = (req, res, next) => {
    let authHeader = req.get('Authorization')
    let token = (authHeader.split(' '))[1]
    try {
        let decodedToken = jwt.verify(token, process.env.APPLICATION_KEY)
        User.findOne({
            where: {
                id: decodedToken.user_id
            }
        }).then(user => {
            next()
        })
    } catch (error) {
        res.send({
            errors: [
                'Your session has expired'
            ]   
        }, 401)
    }
    return
    next()
    // res.send({
    //     errors: [
    //         { message: 'Invalid token. Who are you?' }
    //     ]
    // }, 401)
    // return
    // throw new Error({
    //     errors: [
    //         { message: 'Invalid token. Who are you?' }
    //     ]
    // })
}