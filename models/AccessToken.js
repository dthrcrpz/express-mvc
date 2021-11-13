const { sequelize, Model, DataTypes } = require("./Index")

class AccessToken extends Model {}

AccessToken.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    token_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    revoked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    expires_at: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'access_tokens'
})

AccessToken.sync({ alter: true })

module.exports = AccessToken