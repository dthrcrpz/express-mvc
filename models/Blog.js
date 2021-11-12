const { sequelize, Sequelize } = require("./Index");

const Model = sequelize.define('blogs', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT('long'),
        allowNull: false
    }
})

Model.sync({ alter: true })

module.exports = Model