const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql'
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.DataTypes = DataTypes
db.Model = Model

module.exports = db