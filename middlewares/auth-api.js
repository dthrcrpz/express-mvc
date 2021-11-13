const jwt = require("jsonwebtoken")
const AccessToken = require("../models/AccessToken")
const User = require("../models/User")

module.exports = (req, res, next) => {
    let authHeader = req.get('Authorization')

    if (!authHeader) {
        res.send({
            errors: [
                'Invalid token'
            ]
        }, 401)
        return
    }

    let token = (authHeader.split(' '))[1]
    
    try {
        let decodedToken = jwt.verify(token, process.env.APPLICATION_KEY)
        User.findOne({
            include: [
                {
                    as: 'access_tokens',
                    model: AccessToken,
                    where: {
                        token_id: token_id
                    }
                }
            ],
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