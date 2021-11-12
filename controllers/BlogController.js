const Blog = require('../models/Blog')

exports.index = (req, res) => {
    let blogs = Blog.findAll().then(data => {
        res.send({
            blogs: data
        })
    }).catch(err => {
        res.send(err)
    })
}

exports.store = (req, res) => {
    Blog.create({
        'title': req.body.title,
        'body': req.body.body,
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.send(err)
    })
}