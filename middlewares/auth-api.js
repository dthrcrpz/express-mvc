module.exports = (req, res, next) => {
    let authHeader = req.get('Authorization')
    let token = (authHeader.split(' '))[1]
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