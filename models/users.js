module.exports = (sequelize) => {
    var S = require('sequelize');
    const user = sequelize.define('user', {
        id: {
            type: S.INTEGER,
            auto_incriment: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: S.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: S.STRING,
            allowNull: false,
        },
        email: {
            type: S.STRING,
            allowNull: true,
        },
        timestamps: false,
    })

    return user;
}