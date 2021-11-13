const { sequelize, Model, DataTypes } = require("./Index")
const User = require('./User')

class Blog extends Model {}

Blog.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'blogs'
})

// Blog.sync({ alter: true })

module.exports = Blog