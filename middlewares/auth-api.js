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
            },
            attributes: {
                exclude: ['password']
            }
        }).then(user => {
            req.user = user
            next()
        })
    } catch (error) {
        res.send({
            errors: [
                'Your session has expired'
            ]   
        }, 401)
        return
    }
}