var Sequelize = require('sequelize');
var sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    name: 'wrg',
    username: 'root',
    password: '',
    database: 'wrg'
});
const userModel = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
    },
})

class User {
    constructor(user) {
        console.log(user);
        this.construct(user);
    };

    construct(user) {
        this.userId = user.userId;
        this.username = user.username;
        this.password = user.password;
        this.email = user.email;
    };

    // get userId() { return this.userId }
    // get username() { return this.username }
    // get password() { return this.password }
    // get email() { return this.email }

    create() {
        return new Promise((resolve, reject) => {
            userModel.create({
                username: this.username,
                password: this.password,
                email: this.email,

            }).then((userr) => {
                console.log(userr);
                this.construct(userr);
                resolve(userr);
            }).catch((err) => {
                console.log(err)
            })
        })
    }



}
module.exports.User = User;