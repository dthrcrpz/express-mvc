const path = require('path')

const views = (directory) => {
    return path.join(__dirname, directory)
}

const services = {}
services.views = views

module.exports = services