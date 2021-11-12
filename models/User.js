const { sequelize, Sequelize } = require("./Index");

const Model = sequelize.define('users', {
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    middle_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    full_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Model.sync({ alter: true })

module.exports = Model