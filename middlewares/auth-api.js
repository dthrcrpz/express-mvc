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
                    model: AccessToken,
                    as: 'access_tokens',
                    revoked: true,
                    where: {
                        token_id: decodedToken.token_id,
                        revoked: false
                    }
                }
            ],
            attributes: {
                exclude: ['password']
            }
        }).then(user => {
            if (user == null) {
                res.send({
                    errors: [
                        'Your session has expired'
                    ]   
                }, 401)
                return
            }
            
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