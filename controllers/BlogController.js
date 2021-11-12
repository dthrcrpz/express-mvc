const Blog = require('../models/Blog')

exports.index = (req, res) => {
    Blog.findAll().then(blogs => {
        res.send({
            blogs: blogs
        })
    }).catch(err => {
        res.send(err, 403)
    })
}

exports.store = (req, res) => {
    Blog.create({
        'title': req.body.title,
        'body': req.body.body,
        'user_id': req.user.id
    }).then(blog => {
        res.send(blog)
    }).catch(err => {
        res.send(err, 403)
    })
}