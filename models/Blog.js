const { sequelize, Model, DataTypes } = require("./Index");

class Blog extends Model {}

Blog.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'blogs'
})

Blog.sync({ alter: true })

module.exports = Blog