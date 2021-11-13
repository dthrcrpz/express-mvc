const { sequelize, Model, DataTypes } = require("./Index")
const jwt = require('jsonwebtoken')
const Blog = require('./Blog')
const AccessToken = require("./AccessToken")
const randomstring = require('randomstring')
const moment = require('moment')

class User extends Model {
    createToken () {
        let token_id = randomstring.generate(15)
        let payload = {
            user_id: this.id,
            email: this.email,
            token_id: token_id
        }
        let token = jwt.sign(payload, process.env.APPLICATION_KEY, {
            expiresIn: 604800
        })

        AccessToken.create({
            user_id: this.id,
            token_id: token_id,
            revoked: 0,
            expires_at: moment().add(604800, 's').format('YYYY-MM-DD HH:mm:ss.SSS')
        })
    
        return token
    }
}

User.init({
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    middle_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'users'
})

// User.sync({ alter: true })

User.hasMany(Blog, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'blogs',
    foreignKey: 'user_id'
})

User.hasMany(AccessToken, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'access_tokens',
    foreignKey: 'user_id'
})

module.exports = User