const { sequelize, Model, DataTypes } = require("./Index")
const jwt = require('jsonwebtoken')

class User extends Model {
    createToken () {
        let payload = {
            user_id: this.id,
            email: this.email
        }
        let token = jwt.sign(payload, process.env.APPLICATION_KEY, {
            expiresIn: 604800
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

User.sync({ alter: true })

User.hasMany(require('./Blog'), {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

module.exports = User